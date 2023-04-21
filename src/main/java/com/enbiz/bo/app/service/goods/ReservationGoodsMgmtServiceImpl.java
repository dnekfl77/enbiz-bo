package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.ReservationGoodsMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.ReservationGoodsModifyRequest;
import com.enbiz.bo.app.dto.response.goods.ReservationGoodsMgmtResponse;
import com.enbiz.bo.app.entity.PrGoodsBase;
import com.enbiz.bo.app.entity.PrGoodsBaseModLog;
import com.enbiz.bo.app.entity.PrRsvSaleHist;
import com.enbiz.bo.app.enums.PR003;
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
 * 예약상품관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class ReservationGoodsMgmtServiceImpl implements ReservationGoodsMgmtService {

    private final PrGoodsBaseTrxMapper prGoodsBaseTrxMapper;
    private final PrGoodsBaseMapper prGoodsBaseMapper;
    private final PrRsvSaleHistMapper prRsvSaleHistMapper;
    private final PrRsvSaleHistTrxMapper prRsvSaleHistTrxMapper;
    private final PrGoodsBaseModLogTrxMapper prGoodsBaseModLogTrxMapper;

    @Override
    public List<ReservationGoodsMgmtResponse> getReservationGoodsList(ReservationGoodsMgmtRequest request) throws Exception {
        return (PR003.NORMAL_SALE.isEquals(request.getSaleMethCd())) ? prRsvSaleHistMapper.getReservationNormalSaleGoodsList(request)
                : prRsvSaleHistMapper.getReservationRsvSaleGoodsList(request);
    }

    @Override
    public int getReservationGoodsListCount(ReservationGoodsMgmtRequest request) throws Exception {
        return (PR003.NORMAL_SALE.isEquals(request.getSaleMethCd())) ? prRsvSaleHistMapper.getReservationNormalSaleGoodsListCount(request)
                : prRsvSaleHistMapper.getReservationRsvSaleGoodsListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyGoodsSaleMethod(ReservationGoodsModifyRequest request) throws Exception {

        validationRsvGoodsManage(request);
        
        for(String goodsNo : request.getGoodsNoList()) {
            PrRsvSaleHist prRsvSaleHist = new PrRsvSaleHist();
            BeanUtils.copyProperties(prRsvSaleHist, request);
            prRsvSaleHist.setGoodsNo(goodsNo);

            // 예약판매 -> 일반판매 ( 예약판매이력 중단처리 )
            if (PR003.NORMAL_SALE.isEquals(request.getSaleMethCd())) {
                prRsvSaleHistTrxMapper.stopRsvSaleHist(prRsvSaleHist);
            } else { // 일반판매 -> 예약판매 ( 예약판매이력 추가 )
                prRsvSaleHist.setRsvStopYn("N");
                prRsvSaleHist.setRsvStopCausCd(null);
                prRsvSaleHistTrxMapper.insertRsvSaleHist(prRsvSaleHist);
            }

            // 상품 판매방식 변경
            PrGoodsBase prGoodsBase = new PrGoodsBase();
            BeanUtils.copyProperties(prGoodsBase, request);
            prGoodsBase.setGoodsNo(goodsNo);
            prGoodsBaseTrxMapper.updateSaleMethCd(prGoodsBase);

            // 상품 기본수정 로그 변경
            PrGoodsBaseModLog prGoodsBaseModLog = new PrGoodsBaseModLog();
            BeanUtils.copyProperties(prGoodsBaseModLog, request);
            prGoodsBaseModLog.setGoodsModItemCd("13");
            prGoodsBaseModLog.setGoodsModCont(prGoodsBase.getSaleMethCd());
            prGoodsBaseModLog.setGoodsNo(goodsNo);
            prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(prGoodsBaseModLog);
        }

    }

    private void validationRsvGoodsManage(ReservationGoodsModifyRequest request){

        Validator.throwIfNull(request.getGoodsNoList(), MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"상품번호 확인 불가"}));
        Validator.throwIfEmpty(request.getSaleMethCd(), MessageResolver.getMessage("adminCommon.message.parameter.null", new String[]{"변경할 판매방식 확인 불가"}));

        // 예약상품 -> 일반상품
        if(PR003.NORMAL_SALE.isEquals(request.getSaleMethCd())){
            Validator.throwIfEmpty(request.getRsvStopCausCd()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"예약중단사유"}));
        // 일반상품 -> 예약상품
        }else{
            Validator.throwIfEmpty(request.getRsvStrtDtm()         , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"예약주문시작일시"}));
            Validator.throwIfEmpty(request.getRsvEndDtm()          , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"예약주문종료일시"}));
            Validator.throwIfEmpty(request.getFwdidcPrarDy()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"출고지시예정일자"}));
            Validator.throwIfEmpty(request.getRsvEndAfProcMethCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"예약종료 후 판매방식"}));

            if(Integer.parseInt(request.getRsvEndDtm().substring(0,8)) >=  Integer.parseInt(request.getFwdidcPrarDy())){
                throw new ValidationException(MessageResolver.getMessage("goodsInfoManagement.prRsvSaleHist.popup.message.fwdidcPrarDyImpossMsg"));
            }
        }
    }

    @Override
    public ReservationGoodsMgmtResponse getReservationGoodsInfo(String goodsNo) throws Exception {
        return prGoodsBaseMapper.getRsvGoodsInfo(goodsNo);
    }

    @Override
    public List<ReservationGoodsMgmtResponse> getReservationGoodsHistory(String goodsNo) throws Exception {
        return prRsvSaleHistMapper.getReservationSaleHistList(goodsNo);
    }
}
