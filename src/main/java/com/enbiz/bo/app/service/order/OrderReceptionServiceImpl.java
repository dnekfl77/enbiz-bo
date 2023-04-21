package com.enbiz.bo.app.service.order;

import com.enbiz.bo.app.dto.request.order.orderreception.*;
import com.enbiz.bo.app.dto.response.customer.CustomerNoMaskingResponse;
import com.enbiz.bo.app.dto.response.order.orderreception.*;
import com.enbiz.bo.app.entity.EtMbrDlvpInfo;
import com.enbiz.bo.app.entity.PrStdCtg;
import com.enbiz.bo.app.enums.MK002;
import com.enbiz.bo.app.enums.PR023;
import com.enbiz.bo.app.enums.VD005;
import com.enbiz.bo.app.enums.common.OrderCommonCode;
import com.enbiz.bo.app.repository.customer.EtMbrBaseMapper;
import com.enbiz.bo.app.repository.order.OrderReceptionMapper;
import com.enbiz.common.base.exception.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 상담사 주문접수 ServiceImpl
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class OrderReceptionServiceImpl implements OrderReceptionService{

    private final EtMbrBaseMapper etMbrBaseMapper;
    private final OrderReceptionMapper orderReceptionMapper;

    @Override
    public CustomerNoMaskingResponse getMemberData(String mbrNo) throws Exception {
        return etMbrBaseMapper.getMemberData(mbrNo);
    }

    @Override
    public List<MbrDlvpInfoResponse> getMemberDeliveryList(String mbrNo) throws Exception {
        return orderReceptionMapper.getMemberDeliveryList(mbrNo);
    }

    @Override
    public List<PrStdCtg> getPrStdCtgList() throws Exception {
        return orderReceptionMapper.getPrStdCtgList();
    }

    @Override
    public List<GoodsListResponse> getGoodsKeyWordList(GoodsKeyWordRequest goodsKeyWordRequest) throws Exception {
        return orderReceptionMapper.getGoodsKeyWordList(goodsKeyWordRequest);
    }

    @Override
    public int getGoodsKeyWordListCount(GoodsKeyWordRequest goodsKeyWordRequest) throws Exception {
        return orderReceptionMapper.getGoodsKeyWordListCount(goodsKeyWordRequest);
    }

    @Override
    public List<GoodsListResponse> getGoodsOrderHistList(GoodsOrderHistRequest goodsOrderHistRequest) throws Exception {
        return orderReceptionMapper.getGoodsOrderHistList(goodsOrderHistRequest);
    }

    @Override
    public int getGoodsOrderHistListCount(GoodsOrderHistRequest goodsOrderHistRequest) throws Exception {
        return orderReceptionMapper.getGoodsOrderHistListCount(goodsOrderHistRequest);
    }

    @Override
    public List<GoodsListResponse> getWishList(GoodsWishRequest goodsWishRequest) throws Exception {
        return orderReceptionMapper.getWishList(goodsWishRequest);
    }

    @Override
    public int getWishListCount(GoodsWishRequest goodsWishRequest) throws Exception {
        return orderReceptionMapper.getWishListCount(goodsWishRequest);
    }

    @Override
    public List<GoodsListResponse> getBest100List(GoodsBest100Request goodsBest100Request) throws Exception {
        return orderReceptionMapper.getBest100List(goodsBest100Request);
    }

    @Override
    public int getBest100ListCount(GoodsBest100Request goodsBest100Request) throws Exception {
        return orderReceptionMapper.getBest100ListCount(goodsBest100Request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveMemberDeliveryList(List<EtMbrDlvpInfo> createList, List<EtMbrDlvpInfo> updateList) throws Exception {
        for(EtMbrDlvpInfo entity : createList){
            Map<String, String> validation = entity.validation();

            String result = validation.get("result");
            String message = validation.get("message");

            if(result.equals("N")){
                throw new ValidationException(message);
            }
        }

        //배송비 등록 목록 insert
        if(createList.size() > 0) {
            orderReceptionMapper.insertMemberDeliveryList(createList);
        }

        for(EtMbrDlvpInfo entity : updateList){
            Map<String, String> validation = entity.validation();

            String result = validation.get("result");
            String message = validation.get("message");

            if(result.equals("N")){
                throw new ValidationException(message);
            }
        }

        //배송비 등록 목록 update
        if(updateList.size() > 0) {
            orderReceptionMapper.updateMemberDeliveryList(updateList);
        }

    }

    @Override
    public List<OrderGiftResponse> getOrderGiftList(OrderGiftRequest orderGiftRequest) throws Exception {
        if(StringUtils.isEmpty(orderGiftRequest.getMbrNo())){
            throw new IllegalArgumentException();
        }

        orderGiftRequest.setSiteNo(OrderCommonCode.AGENT_ORDER_SITE.getCd());
        orderGiftRequest.setChlNo(OrderCommonCode.AGENT_ORDER_CHANNEL.getCd());
        return  orderReceptionMapper.getOrderGiftList(orderGiftRequest);
    }

    @Override
    public List<OrderBenefitResponse> getBenefitList(OrderBenefitRequest orderBenefitRequest) throws Exception {
        orderBenefitRequest.setSiteNo(OrderCommonCode.AGENT_ORDER_SITE.getCd());
        orderBenefitRequest.setChlNo(OrderCommonCode.AGENT_ORDER_CHANNEL.getCd());
        return orderReceptionMapper.getBenefitList(orderBenefitRequest);
    }

    @Override
    public List<DlvAmtResponse> getDlvAmtList(List<DlvAmtRequest> dlvAmtRequestList) throws Exception {
        final List<DlvAmtRequest> deliPsbDlvY = dlvAmtRequestList.stream().filter(t -> t.getBdlDeliPsbYn().equals("Y")).collect(Collectors.toList());
        final List<DlvAmtRequest> deliPsbDlvN = dlvAmtRequestList.stream().filter(t -> t.getBdlDeliPsbYn().equals("N")).collect(Collectors.toList());
        final List<String> deliPolcNoList = dlvAmtRequestList.stream().map(t -> t.getDeliPolcNo()).distinct().collect(Collectors.toList());

        /* 배송정책 기준정보 조회 */
        final List<EtDeliPolcResponse> etDeliPolcList = orderReceptionMapper.getDlvAmtList(deliPolcNoList);

        List<DlvAmtResponse> tmpDlvAmtList = new ArrayList<>();

        for(DlvAmtRequest dlvAmt : deliPsbDlvY){
            DlvAmtResponse dlvAmtResponse = new DlvAmtResponse();
            dlvAmtResponse.setDlvpAddr(dlvAmt.getDlvpAddr());
            dlvAmtResponse.setDeliPolcNo(dlvAmt.getDeliPolcNo());
            dlvAmtResponse.setZipNo(dlvAmt.getZipNo());
            tmpDlvAmtList.add(dlvAmtResponse);
        }

        final List<DlvAmtResponse> dlvAmtResponseList = tmpDlvAmtList.stream().distinct().collect(Collectors.toList());

        /*묶은배송 가능*/
        for(DlvAmtResponse dlvAmtResponse: dlvAmtResponseList) {

            for (DlvAmtRequest dlv : deliPsbDlvY) {
                if(dlvAmtResponse.getDlvpAddr().equals(dlv.getDlvpAddr())
                        &&dlvAmtResponse.getDeliPolcNo().equals(dlv.getDeliPolcNo())){

                    String goodsNmTitle = StringUtils.isEmpty(dlvAmtResponse.getGoodsNmTitle())? "" : dlvAmtResponse.getGoodsNmTitle() + "\n";
                    String goodsNoList = StringUtils.isEmpty(dlvAmtResponse.getGoodsNoList())? "" : dlvAmtResponse.getGoodsNoList() + "\n";
                    Integer ordAmt = dlvAmtResponse.getOrdAmt() == null? 0 : dlvAmtResponse.getOrdAmt();

                    dlvAmtResponse.setGoodsNmTitle(goodsNmTitle+dlv.getGoodsNm());
                    dlvAmtResponse.setGoodsNoList(goodsNoList+dlv.getGoodsNo());
                    dlvAmtResponse.setOrdAmt(ordAmt + (dlv.getOrdQty() * dlv.getSalePrc() - dlv.getDiscountAmt()));
                    dlvAmtResponse.setMbrDlvpSeq(dlv.getMbrDlvpSeq());
                }
            }

            for(EtDeliPolcResponse etDeli :etDeliPolcList){
                if(dlvAmtResponse.getDeliPolcNo().equals(etDeli.getDeliPolcNo())){
                    dlvAmtResponse.setEntrNm(etDeli.getEntrNm());
                    dlvAmtResponse.setEntrNo(etDeli.getEntrNo());
                    dlvAmtResponse.setBdlDeliPsbYn("Y");
                    dlvAmtResponse.setDlexTypCd(etDeli.getDlexTypCd());
                    dlvAmtResponse.setDlexTypCdNm(etDeli.getDlexTypCdNm());
                    dlvAmtResponse.setStdAmt(etDeli.getStdAmt());
                    dlvAmtResponse.setDlexAmt(etDeli.getDlexAmt());
                    dlvAmtResponse.setFerryRgnDlexAmt(etDeli.getFerryRgnDlexAmt());
                    dlvAmtResponse.setJejuDlex(etDeli.getJejuDlex());
                    dlvAmtResponse.setJejuFerryRgnDlexAmt(etDeli.getJejuFerryRgnDlexAmt());
                    break;
                }
            }
        }


        /*묶은배송 불가능*/
        for(DlvAmtRequest dlv: deliPsbDlvN){
            DlvAmtResponse dlvAmtResponse = new DlvAmtResponse();

            for(EtDeliPolcResponse etDeli : etDeliPolcList){
                if(dlv.getDeliPolcNo().equals(etDeli.getDeliPolcNo())){
                    dlvAmtResponse.setMbrDlvpSeq(dlv.getMbrDlvpSeq());
                    dlvAmtResponse.setDeliPolcNo(dlv.getDeliPolcNo());
                    dlvAmtResponse.setZipNo(dlv.getZipNo());
                    dlvAmtResponse.setDlvpAddr(dlv.getDlvpAddr());
                    dlvAmtResponse.setEntrNm(etDeli.getEntrNm());
                    dlvAmtResponse.setEntrNo(etDeli.getEntrNo());
                    dlvAmtResponse.setGoodsNmTitle(dlv.getGoodsNm());
                    dlvAmtResponse.setGoodsNoList(dlv.getGoodsNo());
                    dlvAmtResponse.setOrdAmt(dlv.getOrdQty() * dlv.getSalePrc() - dlv.getDiscountAmt());
                    dlvAmtResponse.setBdlDeliPsbYn("N");
                    dlvAmtResponse.setDlexTypCd(etDeli.getDlexTypCd());
                    dlvAmtResponse.setDlexTypCdNm(etDeli.getDlexTypCdNm());
                    dlvAmtResponse.setStdAmt(etDeli.getStdAmt());
                    dlvAmtResponse.setDlexAmt(etDeli.getDlexAmt());
                    dlvAmtResponse.setFerryRgnDlexAmt(etDeli.getFerryRgnDlexAmt());
                    dlvAmtResponse.setJejuDlex(etDeli.getJejuDlex());
                    dlvAmtResponse.setJejuFerryRgnDlexAmt(etDeli.getJejuFerryRgnDlexAmt());
                    break;
                }
            }
            dlvAmtResponseList.add(dlvAmtResponse);
        }

        final List<String> zipNoList = dlvAmtResponseList.stream().map(t -> t.getZipNo()).collect(Collectors.toList());
        final List<DlvRegnByZipCdResponse> deliRegnByZipCd = orderReceptionMapper.getDeliRegnByZipCd(zipNoList);

        setRegnOrdDlvAmt(dlvAmtResponseList,etDeliPolcList,deliRegnByZipCd);

        return dlvAmtResponseList;
    }

    /**
     * 상담사 주문 배송비 계산
     */
    private void setRegnOrdDlvAmt(List<DlvAmtResponse> dlvAmtResponseList,List<EtDeliPolcResponse> etDeliPolcList,List<DlvRegnByZipCdResponse> deliRegnByZipCd) throws Exception {

        for(DlvAmtResponse dlvAmtResponse : dlvAmtResponseList){

            EtDeliPolcResponse etDeliPolcResponse = null;
            String deliRegnGbCd = null; //PR023 배송지역구분코드

            for(EtDeliPolcResponse etDeli : etDeliPolcList){
                if(dlvAmtResponse.getDeliPolcNo().equals(etDeli.getDeliPolcNo())){
                    etDeliPolcResponse = etDeli;
                    break;
                }
            }

            /* 배송정책 없음 */
            if(etDeliPolcResponse == null){
                throw new Exception();
            }

            for(DlvRegnByZipCdResponse dlvRegnCd : deliRegnByZipCd){
                if(dlvRegnCd.getZipNo().equals(dlvAmtResponse.getZipNo())){
                    deliRegnGbCd = dlvRegnCd.getDeliRegnGbCd();
                    break;
                }
            }

            Integer	stdAmt = etDeliPolcResponse.getStdAmt();                           //  기준금액
            Integer	dlexAmt = etDeliPolcResponse.getDlexAmt();                         //  배송비금액
            Integer	ferryRgnDlexAmt = etDeliPolcResponse.getFerryRgnDlexAmt();         //  도서산간배송비
            Integer	jejuDlex = etDeliPolcResponse.getJejuDlex();                       //  제주도배송비
            Integer	jejuFerryRgnDlexAmt = etDeliPolcResponse.getJejuFerryRgnDlexAmt(); //  제주도도서산간배송비

            //무료
            if(dlvAmtResponse.getDlexTypCd().equals(VD005.FREE.getCd())){
                if(deliRegnGbCd == null) { //일반
                    dlvAmtResponse.setOrdDeliAmt(0);
                }else if(deliRegnGbCd.equals(PR023.FERRY_RGN_DLEX_AMT.getCd())){ // 도서 산간
                    dlvAmtResponse.setOrdDeliAmt(ferryRgnDlexAmt - dlexAmt);
                }else if(deliRegnGbCd.equals(PR023.JEJU_DLEX.getCd())){               //제주도
                    dlvAmtResponse.setOrdDeliAmt(jejuDlex - dlexAmt);
                }else if(deliRegnGbCd.equals(PR023.JEJU_FERRY_RGN_DLEX_AMT.getCd())){ // 제주도 산간
                    dlvAmtResponse.setOrdDeliAmt(jejuFerryRgnDlexAmt - dlexAmt);
                }
            }

            //유료
            if(dlvAmtResponse.getDlexTypCd().equals(VD005.PAY.getCd())){
                if(deliRegnGbCd == null) { //일반
                    dlvAmtResponse.setOrdDeliAmt(dlexAmt);
                }else if(deliRegnGbCd.equals(PR023.FERRY_RGN_DLEX_AMT.getCd())){ // 도서 산간
                    dlvAmtResponse.setOrdDeliAmt(ferryRgnDlexAmt);
                }else if(deliRegnGbCd.equals(PR023.JEJU_DLEX.getCd())){               //제주도
                    dlvAmtResponse.setOrdDeliAmt(jejuDlex);
                }else if(deliRegnGbCd.equals(PR023.JEJU_FERRY_RGN_DLEX_AMT.getCd())){ // 제주도 산간
                    dlvAmtResponse.setOrdDeliAmt(jejuFerryRgnDlexAmt);
                }
            }

            //조건무 무료
            if(dlvAmtResponse.getDlexTypCd().equals(VD005.CONDITIONAL_FREE.getCd())){

                boolean stdAmtOver = dlvAmtResponse.getOrdAmt() >= stdAmt;

                if(deliRegnGbCd == null) { //일반
                    dlvAmtResponse.setOrdDeliAmt(stdAmtOver? 0 : dlexAmt);
                }else if(deliRegnGbCd.equals(PR023.FERRY_RGN_DLEX_AMT.getCd())){ // 도서 산간
                    dlvAmtResponse.setOrdDeliAmt(stdAmtOver? ferryRgnDlexAmt - dlexAmt : ferryRgnDlexAmt);
                }else if(deliRegnGbCd.equals(PR023.JEJU_DLEX.getCd())){          //제주도
                    dlvAmtResponse.setOrdDeliAmt(stdAmtOver? jejuDlex - dlexAmt : jejuDlex);
                }else if(deliRegnGbCd.equals(PR023.JEJU_FERRY_RGN_DLEX_AMT.getCd())){ // 제주도 산간
                    dlvAmtResponse.setOrdDeliAmt(stdAmtOver? jejuFerryRgnDlexAmt - dlexAmt : jejuFerryRgnDlexAmt);
                }
            }

            dlvAmtResponse.setHiddenOrdDeliAmt(dlvAmtResponse.getOrdDeliAmt());
        }
    }


    @Override
    public List<DlvCouponResponse> getDlvCouponList(DlvCouponRequest dlvCouponRequest) throws Exception {
        dlvCouponRequest.setPromoTypCd(MK002.FREE_DELIVERY.getCd());
        return orderReceptionMapper.getDlvCouponList(dlvCouponRequest);
    }

    @Override
    public List<MbrAstSumResponse> getMbrAstSumList(String mbrNo) throws Exception {
        return orderReceptionMapper.getMbrAstSumList(mbrNo);
    }
}
