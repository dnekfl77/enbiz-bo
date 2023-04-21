package com.enbiz.bo.app.service.goods;

import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.GoodsTemporarySaveMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsTemporarySaveMgmtResponse;
import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.enums.PR001;
import com.enbiz.bo.app.repository.goods.*;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import lombok.RequiredArgsConstructor;

/**
 * 상품 임시 저장 관리 Service Impl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class GoodsTemporarySaveMgmtServiceImpl implements GoodsTemporarySaveMgmtService {

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
    
    /* 관계상품정보 */
    private final PrPregRelGoodsInfoTrxMapper prPregRelGoodsInfoTrxMapper;

    @Override
    public int getGoodsTemporarySaveListCount(GoodsTemporarySaveMgmtRequest request) throws Exception {
        return prPregGoodsBaseMapper.getGoodsTemporarySaveListCount(request);
    }

    @Override
    public List<GoodsTemporarySaveMgmtResponse> getGoodsTemporarySaveList(GoodsTemporarySaveMgmtRequest request) throws Exception {
        return prPregGoodsBaseMapper.getGoodsTemporarySaveList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteTemporarySaveGoods(GoodsTemporarySaveMgmtRequest request) throws Exception {

        String[] pregGoodsNoArray = request.getPregGoodsNoArray();
        if( pregGoodsNoArray == null || pregGoodsNoArray.length <= 0){
            throw new ValidationException(MessageResolver.getMessage("goodsTemporarySaveMgmt.alert.msg.noSelectesdGoodsForRemoveMsg"));
        }

        for(String pregGoodsInfo : pregGoodsNoArray){
            String pregGoodsNo = pregGoodsInfo.split("/")[0], goodsCompCd = pregGoodsInfo.split("/")[1];

            if(PR001.GEN_GOODS.isEquals(goodsCompCd)){
                deleteTemporaryGeneralGoods(pregGoodsNo);
            }else if(PR001.PKG_GOODS.isEquals(goodsCompCd)){
                deleteTemporaryPackagegGoods(pregGoodsNo);
            }else{
                throw new ValidationException(MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"삭제대상 상품구성코드 확인불가"}));
            }
        }
    }

    private void deleteTemporaryGeneralGoods(String pregGoodsNo) throws Exception {

        // 가등록 상품기본 삭제
        prPregGoodsBaseTrxMapper.deletePregGoods(pregGoodsNo);

        // 가등록 예약판매이력 삭제
        prPregRsvSaleHistTrxMapper.deletePregRsvSaleHist(pregGoodsNo);

        // 가등록 상품항목정보 삭제
        prPregGoodsItemInfoTrxMapper.deletePregGoodsItemInfo(pregGoodsNo);

        // 가등록 상품안전인증이력 삭제
        prPregGoodsSafeCertiHistTrxMapper.deletePregGoodsSafeCertiHist(pregGoodsNo);

        // 가등록 상품가격이력 삭제
        prPregGoodsPrcHistTrxMapper.deletePregGoodsPrcHist(pregGoodsNo);

        // 가등록 상품결제수단정보 삭제
        prPregGoodsPayMeanInfoTrxMapper.deletePregGoodsPayMeanInfo(pregGoodsNo);

        // 가등록 단품옵션정보 삭제
        prPregItmOptnInfoTrxMapper.deletePregItmOptnInfo(pregGoodsNo);

        // 가등록 단품기본 삭제
        prPregItmBaseTrxMapper.deletePregItmBase(pregGoodsNo);

        // 가등록 상품홍보문구이력 삭제
        prPregAdveWrdHistTrxMapper.deletePregAdveWrdHist(pregGoodsNo);

        // 가등록 증정품이력 삭제
        prPregPrestHistTrxMapper.deletePregPrestHist(pregGoodsNo);

        // 가등록 연계상품정보 삭제
        prPregAssocGoodsInfoTrxMapper.deleteAllPregAssocGoods(pregGoodsNo);

        // 가등록 상품컨텐츠정보 삭제

    }

    private void deleteTemporaryPackagegGoods(String pregGoodsNo) throws Exception {

        // 가등록 상품기본 삭제
        prPregGoodsBaseTrxMapper.deletePregGoods(pregGoodsNo);

        // 가등록 관계상품정보 삭제
        prPregRelGoodsInfoTrxMapper.deleteAllPrPregRelGoods(pregGoodsNo);

        // 가등록 상품컨텐츠정보 삭제

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void requestTemporarySaveGoodsApproval(GoodsTemporarySaveMgmtRequest request) throws Exception {

        String[] pregGoodsNoArray = request.getPregGoodsNoArray();
        if( pregGoodsNoArray == null || pregGoodsNoArray.length <= 0){
            throw new ValidationException(MessageResolver.getMessage("goodsTemporarySaveMgmt.alert.msg.noSelectesdGoodsForRequestMsg"));
        }

        PrPregGoodsBase prPregGoodsBase = new PrPregGoodsBase();
        BeanUtils.copyProperties(prPregGoodsBase,request);

        for(String pregGoodsNo : pregGoodsNoArray){
            prPregGoodsBase.setPregGoodsNo(pregGoodsNo);
            prPregGoodsBaseTrxMapper.requestPregGoodsApproval(prPregGoodsBase);
        }
    }
}
