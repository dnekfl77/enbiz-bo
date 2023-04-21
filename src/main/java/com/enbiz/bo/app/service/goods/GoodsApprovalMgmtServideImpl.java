package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.GoodsApprovalMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsApprovalMgmtResponse;
import com.enbiz.bo.app.entity.PrItmSaleStatHist;
import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.enums.PR001;
import com.enbiz.bo.app.enums.PR005;
import com.enbiz.bo.app.enums.PR020;
import com.enbiz.bo.app.repository.goods.*;
import com.enbiz.common.base.Validator;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import lombok.RequiredArgsConstructor;

/**
 * 상품 승인 관리 Service Impl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class GoodsApprovalMgmtServideImpl implements GoodsApprovalMgmtService {

    /* 상품기본 */
    private final PrPregGoodsBaseMapper prPregGoodsBaseMapper;
    private final PrPregGoodsBaseTrxMapper prPregGoodsBaseTrxMapper;

    /* 예약판매이력 */
    private final PrPregRsvSaleHistTrxMapper prPregRsvSaleHistTrxMapper;

    /* 상품항목정보 */
    private final PrPregGoodsItemInfoTrxMapper prPregGoodsItemInfoTrxMapper;

    /* 상품안전인증이력 */
    private final PrPregGoodsSafeCertiHistTrxMapper prPregGoodsSafeCertiHistTrxMapper;

    /* 상품가격이력 */
    private final PrPregGoodsPrcHistTrxMapper prPregGoodsPrcHistTrxMapper;

    /* 상품결제수단정보 */
    private final PrPregGoodsPayMeanInfoTrxMapper prPregGoodsPayMeanInfoTrxMapper;

    /* 단품옵션정보 */
    private final PrPregItmOptnInfoTrxMapper prPregItmOptnInfoTrxMapper;

    /* 단품기본 */
    private final PrPregItmBaseTrxMapper prPregItmBaseTrxMapper;

    /* 상품홍보문구이력 */
    private final PrPregAdveWrdHistTrxMapper prPregAdveWrdHistTrxMapper;

    /* 증정품 이력 */
    private final PrPregPrestHistTrxMapper prPregPrestHistTrxMapper;

    /* 연관상품정보 */
    private final PrPregAssocGoodsInfoTrxMapper prPregAssocGoodsInfoTrxMapper;

    /* 관계품정보 */
    private final PrPregRelGoodsInfoTrxMapper prPregRelGoodsInfoTrxMapper;

    private final PrItmSaleStatHistTrxMapper prItmSaleStatHistTrxMapper; // 상품,단품 판매상태 이력력

    @Override
    public int getGoodsApprovalListCount(GoodsApprovalMgmtRequest request) throws Exception {
        return prPregGoodsBaseMapper.getGoodsApprovalListCount(request);
    }

    @Override
    public List<GoodsApprovalMgmtResponse> getGoodsApprovalList(GoodsApprovalMgmtRequest request) throws Exception {
        return prPregGoodsBaseMapper.getGoodsApprovalList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void approveGoods(GoodsApprovalMgmtRequest request) throws Exception {

        String[] pregGoodsNoList = request.getPregGoodsNoList();
        if( pregGoodsNoList == null || pregGoodsNoList.length <= 0){
            throw new ValidationException(MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"선택상품 확인불가"}));
        }

        PrPregGoodsBase prPregGoodsBase = new PrPregGoodsBase();
        BeanUtils.copyProperties(prPregGoodsBase, request);

        for(String pregGoodsInfo : pregGoodsNoList){
            String pregGoodsNo = pregGoodsInfo.split("/")[0], goodsCompCd = pregGoodsInfo.split("/")[1];
            prPregGoodsBase.setPregGoodsNo(pregGoodsNo);

            Validator.throwIfEmpty(prPregGoodsBase.getPregGoodsNo(),MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품번호 확인불가"}));
            Validator.throwIfEmpty(prPregGoodsBase.getSysRegId(),MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"시스템 등록자 ID 확인불가"}));

            // 가등록상품기본 적용
            prPregGoodsBaseTrxMapper.applyPregGoods(prPregGoodsBase);

            // 상품 판매상태이력 생성
            PrItmSaleStatHist prItmSaleStatHist = new PrItmSaleStatHist();
            BeanUtils.copyProperties(prItmSaleStatHist, prPregGoodsBase);
            prItmSaleStatHist.setGoodsItmGbCd(PR020.GOODS.getCd());
            prItmSaleStatHist.setItmNo("0");
            prItmSaleStatHist.setItmSaleStatCd(PR005.SALES.getCd());
            prItmSaleStatHistTrxMapper.insertPrItmSaleStatHist(prItmSaleStatHist);

            if(PR001.GEN_GOODS.isEquals(goodsCompCd)){
                applyGoods(prPregGoodsBase); // 일반상품
            }else if(PR001.PKG_GOODS.isEquals(goodsCompCd)){
                applyPkgGoods(prPregGoodsBase); // 묶음상품
            }else{
                Validator.throwIfEmpty(goodsCompCd,MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"유효하지않은 상품구성코드"}));
            }

            // 임시상품 승인상태 변경 ( 승인대기 -> 승인완료 )
            changePregGoodsState(prPregGoodsBase);
        }
    }

    private void changePregGoodsState(PrPregGoodsBase prPregGoodsBase) throws Exception {
        prPregGoodsBaseTrxMapper.approvePregGoods(prPregGoodsBase);
    }

    private void applyGoods(PrPregGoodsBase prPregGoodsBase) throws Exception {

        // 가등록예약판매이력 적용
        prPregRsvSaleHistTrxMapper.applyPregRsvSaleHist(prPregGoodsBase);

        // 가등록상품항목정보 적용
        prPregGoodsItemInfoTrxMapper.applyPregGoodsItemInfo(prPregGoodsBase);

        // 가등록상품안전인증이력 적용
        prPregGoodsSafeCertiHistTrxMapper.applyPregGoodsSafeCertiHist(prPregGoodsBase);

        // 가등록상품가격이력 적용
        prPregGoodsPrcHistTrxMapper.applyPregGoodsPrcHist(prPregGoodsBase);

        // 가등록상품결제수단정보 적용
        prPregGoodsPayMeanInfoTrxMapper.applyPregGoodsPayMeanInfo(prPregGoodsBase);

        //가등록단품옵션정보 적용
        prPregItmOptnInfoTrxMapper.applyPregItmOptnInfo(prPregGoodsBase);

        //가등록단품기본 적용
        prPregItmBaseTrxMapper.applyPregItmBase(prPregGoodsBase);

        // 단품 판매상태이력 생성
        prItmSaleStatHistTrxMapper.applyPrItmSaleStatHist(prPregGoodsBase);

        // 가등록상품홍보문구이력 적용
        prPregAdveWrdHistTrxMapper.applyPregAdveWrdHist(prPregGoodsBase);

        //가등록증정품이력 적용
        prPregPrestHistTrxMapper.applyPregPrestHist(prPregGoodsBase);

        //가등록연관상품정보 적용
        prPregAssocGoodsInfoTrxMapper.applyPregAssocGoodsInfo(prPregGoodsBase);

        //이미지적용

    }

    private void applyPkgGoods(PrPregGoodsBase prPregGoodsBase) throws Exception {

        // 가등록 관계상품정보 적용
        prPregRelGoodsInfoTrxMapper.applyPrPregRelGoodsInfo(prPregGoodsBase);

        //이미지적용

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void returnGoods(GoodsApprovalMgmtRequest request) throws Exception {

        PrPregGoodsBase prPregGoodsBase = new PrPregGoodsBase();
        BeanUtils.copyProperties(prPregGoodsBase, request);

        Validator.throwIfEmpty(prPregGoodsBase.getPregGoodsNo() ,MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"임시상품번호 확인불가"}));
        Validator.throwIfEmpty(prPregGoodsBase.getSysModId()    ,MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"시스템 수정자 ID"}));
        Validator.throwIfEmpty(prPregGoodsBase.getRetnCaus()    ,MessageResolver.getMessage("goodsApprovalMgmt.returnPopup.alert.msg.noSelectedReturnCusMsg"));
        Validator.throwIfEmpty(prPregGoodsBase.getRetnCausCd()  ,MessageResolver.getMessage("goodsApprovalMgmt.returnPopup.alert.msg.noInputReturnCusMsg"));

        prPregGoodsBaseTrxMapper.returnPregGoods(prPregGoodsBase);
    }
}
