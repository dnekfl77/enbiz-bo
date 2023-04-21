package com.enbiz.bo.app.service.goods;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.GeneralGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsPriceHistoryRequest;
import com.enbiz.bo.app.dto.request.goods.PackageGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.AssociatedGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.DeliveryPolicyResponse;
import com.enbiz.bo.app.dto.response.goods.GeneralGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsBaseResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsPriceHistoryResponse;
import com.enbiz.bo.app.dto.response.goods.PackageGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.StandardCategoryDisplayResponse;
import com.enbiz.bo.app.entity.PrAdveWrdHist;
import com.enbiz.bo.app.entity.PrAssocGoodsInfo;
import com.enbiz.bo.app.entity.PrGoodsBase;
import com.enbiz.bo.app.entity.PrGoodsBaseModLog;
import com.enbiz.bo.app.entity.PrGoodsItemInfo;
import com.enbiz.bo.app.entity.PrGoodsNotiItemCd;
import com.enbiz.bo.app.entity.PrGoodsPayMeanInfo;
import com.enbiz.bo.app.entity.PrGoodsPrcHist;
import com.enbiz.bo.app.entity.PrGoodsSafeCertiHist;
import com.enbiz.bo.app.entity.PrItmBase;
import com.enbiz.bo.app.entity.PrItmSaleStatHist;
import com.enbiz.bo.app.entity.PrPrestHist;
import com.enbiz.bo.app.entity.PrRelGoodsInfo;
import com.enbiz.bo.app.entity.PrRsvSaleHist;
import com.enbiz.bo.app.entity.PrStdCtgDispInfo;
import com.enbiz.bo.app.enums.PR003;
import com.enbiz.bo.app.enums.PR005;
import com.enbiz.bo.app.enums.PR020;
import com.enbiz.bo.app.enums.PR032;
import com.enbiz.bo.app.enums.PR034;
import com.enbiz.bo.app.enums.PR038;
import com.enbiz.bo.app.repository.display.PrStdCtgDispInfoMapper;
import com.enbiz.bo.app.repository.display.PrStdCtgDispInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrAdveWrdHistMapper;
import com.enbiz.bo.app.repository.goods.PrAdveWrdHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrAssocGoodsInfoMapper;
import com.enbiz.bo.app.repository.goods.PrAssocGoodsInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseModLogTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsItemInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsItemInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsNotiItemCdMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsPayMeanInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsPayMeanInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsPrcHistMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsPrcHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsSafeCertiHistMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsSafeCertiHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrItmBaseMapper;
import com.enbiz.bo.app.repository.goods.PrItmBaseTrxMapper;
import com.enbiz.bo.app.repository.goods.PrItmSaleStatHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPrestHistMapper;
import com.enbiz.bo.app.repository.goods.PrPrestHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrRelGoodsInfoMapper;
import com.enbiz.bo.app.repository.goods.PrRelGoodsInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrRsvSaleHistMapper;
import com.enbiz.bo.app.repository.goods.PrRsvSaleHistTrxMapper;
import com.enbiz.bo.app.repository.vendor.EtDeliPolcBaseMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상품 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class GoodsCommonServiceImpl implements GoodsCommonService {

    private static final String EMPTY_ERROR_MSG = "generalGoods.err.msg.noSaveRequiredValueError";
    private static final String NULL_ERROR_MSG = "generalGoods.err.msg.isNullError";

    private static final String INSERT_TYPE = "I";
    private static final String UPDATE_TYPE = "U";
    private static final String DELETE_TYPE = "D";

    /* 상품기본 */
    private final PrGoodsBaseMapper prGoodsBaseMapper;
    private final PrGoodsBaseTrxMapper prGoodsBaseTrxMapper;

    /* 예약판매이력 */
    private final PrRsvSaleHistMapper prRsvSaleHistMapper;
    private final PrRsvSaleHistTrxMapper prRsvSaleHistTrxMapper;

    /* 상품고시항목코드 */
    private final PrGoodsNotiItemCdMapper prGoodsNotiItemCdMapper;

    /* 상품항목정보 */
    private final PrGoodsItemInfoMapper prGoodsItemInfoMapper;
    private final PrGoodsItemInfoTrxMapper prGoodsItemInfoTrxMapper;

    /* 상품안전인증이력 */
    private final PrGoodsSafeCertiHistMapper prGoodsSafeCertiHistMapper;
    private final PrGoodsSafeCertiHistTrxMapper prGoodsSafeCertiHistTrxMapper;

    /* 상품가격이력 */
    private final PrGoodsPrcHistMapper prGoodsPrcHistMapper;
    private final PrGoodsPrcHistTrxMapper prGoodsPrcHistTrxMapper;

    /* 상품결제수단정보 */
    private final PrGoodsPayMeanInfoMapper prGoodsPayMeanInfoMapper;
    private final PrGoodsPayMeanInfoTrxMapper prGoodsPayMeanInfoTrxMapper;

    /* 단품기본 */
    private final PrItmBaseMapper prItmBaseMapper;
    private final PrItmBaseTrxMapper prItmBaseTrxMapper;

    /*  표준카테고리전시정보 */
    private final PrStdCtgDispInfoMapper prStdCtgDispInfoMapper;
    private final PrStdCtgDispInfoTrxMapper prStdCtgDispInfoTrxMapper;

    /* 연관상품정보 */
    private final PrAssocGoodsInfoMapper prAssocGoodsInfoMapper;
    private final PrAssocGoodsInfoTrxMapper prAssocGoodsInfoTrxMapper;

    /* 상품홍보문구이력 */
    private final PrAdveWrdHistMapper prAdveWrdHistMapper;
    private final PrAdveWrdHistTrxMapper prAdveWrdHistTrxMapper;

    /* 증정품 이력 */
    private final PrPrestHistMapper prPrestHistMapper;
    private final PrPrestHistTrxMapper prPrestHistTrxMapper;

    /* 관계상품정보 */
    private final PrRelGoodsInfoMapper prRelGoodsInfoMapper;
    private final PrRelGoodsInfoTrxMapper prRelGoodsInfoTrxMapper;

    private final PrItmSaleStatHistTrxMapper prItmSaleStatHistTrxMapper;    // 상품단품판매상태이력
    private final EtDeliPolcBaseMapper etDeliPolcBaseMapper;                // 배송정책기본
    private final PrGoodsBaseModLogTrxMapper prGoodsBaseModLogTrxMapper;    // 상품기본수정로그

    @Override
    public GoodsBaseResponse getGoodsBaseInfo(String goodsNo) throws Exception {
        return prGoodsBaseMapper.getGoodsInfo(goodsNo);
    }

    @Override
    public GeneralGoodsResponse getGeneralGoodsInfo(GoodsBaseResponse goodsBase) throws Exception {

        GeneralGoodsResponse generalGoodsInfo = new GeneralGoodsResponse();
        String goodsNo = goodsBase.getGoodsNo();

        // 판매방식이 예약판매인 경우, 예약판매이력 조회
        PrRsvSaleHist prRsvSaleHist = new PrRsvSaleHist();
        if ( PR003.RSV_SALE.isEquals(goodsBase.getSaleMethCd()) ) {
            prRsvSaleHist = prRsvSaleHistMapper.getRsvSaleHist(goodsNo);
        }

        // 상품항목정보 조회
        List<PrGoodsItemInfo> prGoodsItemInfoList = prGoodsItemInfoMapper.getGoodsItemList(goodsNo);

        // 상품안전인증이력조회
        List<PrGoodsSafeCertiHist> prGoodsSafeCertiHistList = new ArrayList<>();
        if ( "Y".equals(goodsBase.getSafeCertiTgtYn()) ) {
            prGoodsSafeCertiHistList = prGoodsSafeCertiHistMapper.getGoodsSafeCertiHistList(goodsNo);
        }

        // 상품가격이력 조회
        PrGoodsPrcHist prGoodsPrcHist = prGoodsPrcHistMapper.getGoodsPrcHist(goodsNo);

        // 상품결제수단정보 조회
        List<PrGoodsPayMeanInfo> prGoodsPayMeanInfoList = prGoodsPayMeanInfoMapper.getGoodsPayMeanList(goodsNo);

        // 단품 기본 조회
        List<PrItmBase> prItmBaseList = prItmBaseMapper.getGoodsItemBaseList(goodsNo);

        // 표준카테고리전시정보 목록 조회
        List<StandardCategoryDisplayResponse> prStdCtgDispInfoList = prStdCtgDispInfoMapper.getPrStdCtgDispInfoListFromGoods(goodsBase.getStdCtgNo());

        // 연관상품 목록 조회
        List<AssociatedGoodsResponse> prAssocGoodsInfoList = prAssocGoodsInfoMapper.getAssociatedGoodsList(goodsNo);

        // 상품홍보문구 목록 조회
        List<PrAdveWrdHist> prAdveWrdHistList = prAdveWrdHistMapper.getAdvertisingWordList(goodsNo);

        // 증정품 목록 조회
        List<PrPrestHist> prPrestHistList = prPrestHistMapper.getPresentList(goodsNo);

        // 이미지 조회

        generalGoodsInfo.setPrGoodsBase(goodsBase);
        generalGoodsInfo.setPrRsvSaleHist(prRsvSaleHist);
        generalGoodsInfo.setPrGoodsItemInfoList(prGoodsItemInfoList);
        generalGoodsInfo.setPrGoodsSafeCertiHistList(prGoodsSafeCertiHistList);
        generalGoodsInfo.setPrGoodsPrcHist(prGoodsPrcHist);
        generalGoodsInfo.setPrGoodsPayMeanInfoList(prGoodsPayMeanInfoList);
        generalGoodsInfo.setPrItmBaseList(prItmBaseList);
        generalGoodsInfo.setPrStdCtgDispInfoList(prStdCtgDispInfoList);
        generalGoodsInfo.setPrAssocGoodsInfoList(prAssocGoodsInfoList);
        generalGoodsInfo.setPrAdveWrdHistList(prAdveWrdHistList);
        generalGoodsInfo.setPrPrestHistList(prPrestHistList);

        return generalGoodsInfo;
    }

    @Override
    public PackageGoodsResponse getPackageGoodsInfo(GoodsBaseResponse goodsBase) throws Exception {

        PackageGoodsResponse packageGoodsInfo = new PackageGoodsResponse();
        packageGoodsInfo.setPrGoodsBase(goodsBase);
        packageGoodsInfo.setPrRelGoodsInfoList(prRelGoodsInfoMapper.getPrRelGoodsInfoList(goodsBase.getGoodsNo()));

        // 이미지 조회

        return packageGoodsInfo;
    }

    @Override
    public List<PrGoodsNotiItemCd> getGoodsNotificationItemList(String goodsNotiLisartCd) throws Exception {
        return prGoodsNotiItemCdMapper.getGoodsNotiItemCdList(goodsNotiLisartCd);
    }

    @Override
    public List<DeliveryPolicyResponse> getDeliveryPolicyList(String entrNo) throws Exception {
        return etDeliPolcBaseMapper.getEntrDeliveryPolicyList(entrNo);
    }

    @Override
    public boolean checkGoodsReservedPriceHistoryYn(String goodsNo) throws Exception {
        return prGoodsPrcHistMapper.checkGoodsReservedPriceHistoryYn(goodsNo);
    }

    @Override
    public int getGeneralGoodsPriceHistoryListCount(GoodsPriceHistoryRequest request) throws Exception {
        return prGoodsPrcHistMapper.getGoodsPrcHistListCount(request);
    }

    @Override
    public List<GoodsPriceHistoryResponse> getGeneralGoodsPriceHistoryList(GoodsPriceHistoryRequest request) throws Exception {
        return prGoodsPrcHistMapper.getGoodsPrcHistList(request);
    }

    @Override
    public PrGoodsPrcHist getPresentGoodsPriceHistory(String goodsNo) throws Exception {
        return prGoodsPrcHistMapper.getGoodsPrcHist(goodsNo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyGoodsPriceReservation(GoodsPriceHistoryRequest request) throws Exception {

        // 기존 이력 중단처리
        stopGoodsPriceHist(request);
        
        // 새로운 이력 추가
        insertGoodsPriceHist(request);
    }

    private void stopGoodsPriceHist(GoodsPriceHistoryRequest request) throws Exception {

        Validator.throwIfEmpty( request.getHistStrDtm() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"가격변경 적용시작일"}));
        Validator.throwIfNull( request.getGoodsNo()    , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"상품번호 확인불가"}));
        Validator.throwIfNull( request.getSysModId()   , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"시스템 수정자ID 확인불가"}));

        // 이전 이력 종료일자 = 새로운 이력 시작일자 - 1초
        Date date = DateUtils.parseDate(request.getHistStrDtm(),"yyyy-MM-dd HH:mm:ss");
        Calendar histEndDtm = DateUtils.toCalendar(date);
        histEndDtm.add(Calendar.SECOND,-1);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        request.setHistEndDtm(formatter.format(histEndDtm.getTime()));

        prGoodsPrcHistTrxMapper.stopGoodsPriceHist(request);
    }

    private void insertGoodsPriceHist(GoodsPriceHistoryRequest request) throws Exception {

        Validator.throwIfNull( request.getGoodsNo()     , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"상품번호 확인불가"}));
        Validator.throwIfNull( request.getSupPcost()    , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"공급원가 확인불가"}));
        Validator.throwIfNull( request.getNorPrc()      , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"정상가 확인불가"}));
        Validator.throwIfNull( request.getMrgnRate()    , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"마진율 확인불가"}));
        Validator.throwIfNull( request.getSysRegId()    , MessageResolver.getMessage("adminCommon.message.parameter.null", new String[] {"시스템 등록자ID 확인불가"}));

        Validator.throwIfEmpty( request.getHistStrDtm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"가격변경 적용시작일"}));
        Validator.throwIfNull ( request.getSalePrc()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"변경판매가"}));
        Validator.throwIfEmpty( request.getPrcChgCausCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"가격변경사유"}));

        prGoodsPrcHistTrxMapper.insertGoodsPriceHist(request);
    }

    @Override
    public void modifyGeneralGoods(RawRealGridCUDRequest rawCUDRequest, GeneralGoodsRequest request) throws Exception {

        validateGeneralGoods(request);

        PrGoodsBase prGoodsBase = request.getPrGoodsBase();
        BeanUtils.copyProperties(prGoodsBase,request);

        PrRsvSaleHist prRsvSaleHist = request.getPrRsvSaleHist();
        BeanUtils.copyProperties(prRsvSaleHist,prGoodsBase);

        // 판매방식이 예약판매인 경우
        if ( PR003.RSV_SALE.isEquals(prGoodsBase.getSaleMethCd()) && !StringUtils.isEmpty(prRsvSaleHist.getRsvStopYn())) {
            // 예약중단처리
            if("Y".equals(prRsvSaleHist.getRsvStopYn())){
                prRsvSaleHistTrxMapper.stopRsvSaleHist(prRsvSaleHist);
                // 예약중단사유가 '즉시 일반판매 전환' 일 경우 상품 판매방식 변경
                if(PR034.SALE_CVRT.isEquals(prRsvSaleHist.getRsvStopCausCd())){
                    prGoodsBase.setSaleMethCd(PR003.NORMAL_SALE.getCd());
                }
            }else { // 예약이력수정
                prRsvSaleHistTrxMapper.updateRsvSaleHist(prRsvSaleHist);
            }
        }

        // 기존 상품 기본 정보 조회
        PrGoodsBase prePrGoodsBase = prGoodsBaseMapper.getGoodsInfo(prGoodsBase.getGoodsNo());

        // 상품기본 수정
        prGoodsBaseTrxMapper.updatePrGoodsBase(prGoodsBase);

        // 상품기본 수정 로그 생성
        insertGoodsModLog ( prePrGoodsBase, prGoodsBase );

        // 판매상태가 변경된 경우, 판매상태이력생성
        if(!prePrGoodsBase.getSaleStatCd().equals(prGoodsBase.getSaleStatCd())){

            PrItmSaleStatHist prItmSaleStatHist = new PrItmSaleStatHist();
            BeanUtils.copyProperties(prItmSaleStatHist, prGoodsBase);

            prItmSaleStatHist.setItmNo("0");
            prItmSaleStatHist.setGoodsItmGbCd(PR020.GOODS.getCd());
            prItmSaleStatHist.setItmSaleStatCd(prGoodsBase.getSaleStatCd());

            // 변경된 판매상태가 "품절"인 경우, 품절 사유코드 추가
            if(PR005.SOLD_OUT.isEquals(prGoodsBase.getSaleStatCd())){
                prItmSaleStatHist.setSoutCausCd(PR032.MANAGER.getCd());
            }

            // 기존 판매상태이력 변경
            prItmSaleStatHistTrxMapper.updatePrItmSaleStatHist(prItmSaleStatHist);

            // 신규 판매상태이력 추가
            prItmSaleStatHistTrxMapper.insertPrItmSaleStatHist(prItmSaleStatHist);
        }

        // 상품항목정보 수정
        List<PrGoodsItemInfo> prGoodsItemInfoList = request.getPrGoodsItemInfoList();
        for ( PrGoodsItemInfo itemInfo : prGoodsItemInfoList ) {
            BeanUtils.copyProperties(itemInfo, prGoodsBase);
            prGoodsItemInfoTrxMapper.updateGoodsItemInfo(itemInfo);
        }

        List<PrGoodsSafeCertiHist> prGoodsSafeCertiHistList = request.getPrGoodsSafeCertiHistList();
        // 기등록된 상품안전인증이력 삭제
        prGoodsSafeCertiHistTrxMapper.deleteAllGoodsSafeCertiHist(prGoodsBase.getGoodsNo());
        // 상품안전인증이력 추가
        if ( "Y".equals(prGoodsBase.getSafeCertiTgtYn())) {
            for ( PrGoodsSafeCertiHist safeCertiHist : prGoodsSafeCertiHistList) {
                BeanUtils.copyProperties(safeCertiHist, prGoodsBase);
                prGoodsSafeCertiHistTrxMapper.insertGoodsSafeCertiHist(safeCertiHist);
            }
        }

        List<PrGoodsPayMeanInfo> prGoodsPayMeanInfoList = request.getPrGoodsPayMeanInfoList();
        // 기등록된 상품결제수단정보 삭제
        prGoodsPayMeanInfoTrxMapper.deleteAllGoodsPayMean(prGoodsBase.getGoodsNo());
        // 상품결제수단 추가
        for ( PrGoodsPayMeanInfo payMeanInfo : prGoodsPayMeanInfoList ) {
            BeanUtils.copyProperties(payMeanInfo, prGoodsBase);
            prGoodsPayMeanInfoTrxMapper.insertGoodsPayMeanInfo(payMeanInfo);
        }

        // 홍보문구 수정
        List<PrAdveWrdHist> prAdveWrdHistList = request.getPrAdveWrdHistList();
        prAdveWrdHistTrxMapper.deleteAllAdvertisingWord(prGoodsBase.getGoodsNo());
        for ( PrAdveWrdHist advertisingWord : prAdveWrdHistList ) {
            BeanUtils.copyProperties(advertisingWord, prGoodsBase);
            prAdveWrdHistTrxMapper.insertPrAdveWrdHist(advertisingWord);
        }

        // 증정품 수정
        List<PrPrestHist> prPrestHistList = request.getPrPrestHistList();
        prPrestHistTrxMapper.deleteAllPrPrestHist(prGoodsBase.getGoodsNo());
        for ( PrPrestHist present : prPrestHistList ) {
            BeanUtils.copyProperties(present, prGoodsBase);
            prPrestHistTrxMapper.insertPrPrestHist(present);
        }

        // 표준카테고리 전시정보, 연관상품정보 수정
        updateGoodsGridData(rawCUDRequest, prGoodsBase);

    }

    private void updateGoodsGridData(RawRealGridCUDRequest rawCUDRequest, PrGoodsBase prGoodsBase) throws Exception {

        // 단품 수정
        RealGridCUDRequest<PrItmBase> itemGridCUD = rawCUDRequest.getRequest("detailItemListGridData", PrItmBase.class);
        List<PrItmBase> updatedPrItmBaseList = itemGridCUD.getUpdate();
        for ( PrItmBase item : updatedPrItmBaseList ) {
            BeanUtils.copyProperties(item, prGoodsBase);

            // 기존 이력 조회
            PrItmBase preItem = prItmBaseMapper.getPrItmBaseInfo(item);

            // 단품 판매상태가 변경된 경우
            if(!preItem.getItmSaleStatCd().equals(item.getItmSaleStatCd())){

                PrItmSaleStatHist prItmSaleStatHist = new PrItmSaleStatHist();
                BeanUtils.copyProperties(prItmSaleStatHist, prGoodsBase);

                prItmSaleStatHist.setItmNo(item.getItmNo());
                prItmSaleStatHist.setGoodsItmGbCd(PR020.ITEM.getCd());
                prItmSaleStatHist.setItmSaleStatCd(item.getItmSaleStatCd());

                // 품절로 변경된 경우
                if(PR005.SOLD_OUT.isEquals(item.getItmSaleStatCd())){
                    prItmSaleStatHist.setSoutCausCd(PR032.MANAGER.getCd());
                    item.setSoutCausCd(PR032.MANAGER.getCd());
                }

                // 기존 판매상태이력 변경
                prItmSaleStatHistTrxMapper.updatePrItmSaleStatHist(prItmSaleStatHist);

                // 신규 판매상태이력 추가
                prItmSaleStatHistTrxMapper.insertPrItmSaleStatHist(prItmSaleStatHist);
            }

            // 단품 기본 수정
            prItmBaseTrxMapper.updatePrItemBase(validatePrItmBase(item));
        }

        // 표준카테고리전시정보 수정
        RealGridCUDRequest<PrStdCtgDispInfo> dispCtgGridCUD
                = rawCUDRequest.getRequest("detailDispCtgGrid", PrStdCtgDispInfo.class);
        List<PrStdCtgDispInfo> createdStdCtgDispInfoList = dispCtgGridCUD.getCreate();
        List<PrStdCtgDispInfo> updatedStdCtgDispInfoList = dispCtgGridCUD.getUpdate();
        List<PrStdCtgDispInfo> deletedStdCtgDispInfoList = dispCtgGridCUD.getDelete();

        for ( PrStdCtgDispInfo stdCtgDispInfo : createdStdCtgDispInfoList ) {
            stdCtgDispInfo.setSysRegId(prGoodsBase.getSysRegId());
            prStdCtgDispInfoTrxMapper.insertPrStdCtgDispInfoFromGoods(validatePrStdCtgDispInfo(stdCtgDispInfo, INSERT_TYPE));
        }

        for ( PrStdCtgDispInfo stdCtgDispInfo : updatedStdCtgDispInfoList ) {
            stdCtgDispInfo.setSysModId(prGoodsBase.getSysModId());
            prStdCtgDispInfoTrxMapper.updatePrStdCtgDispInfoFromGoods(validatePrStdCtgDispInfo(stdCtgDispInfo, UPDATE_TYPE));
        }

        for ( PrStdCtgDispInfo stdCtgDispInfo : deletedStdCtgDispInfoList ) {
            prStdCtgDispInfoTrxMapper.deletePrStdCtgDispInfoFromGoods(validatePrStdCtgDispInfo(stdCtgDispInfo, DELETE_TYPE));
        }

        // 연관상품정보 수정
        RealGridCUDRequest<PrAssocGoodsInfo> assocGoodsGridCUD
                = rawCUDRequest.getRequest("detailAssocGoodsGrid", PrAssocGoodsInfo.class);
        List<PrAssocGoodsInfo> createdAssociatedGoodsList = assocGoodsGridCUD.getCreate();
        List<PrAssocGoodsInfo> updatedAssociatedGoodsList = assocGoodsGridCUD.getUpdate();
        List<PrAssocGoodsInfo> deletedAssociatedGoodsList = assocGoodsGridCUD.getDelete();

        for ( PrAssocGoodsInfo assocGoodsInfo : createdAssociatedGoodsList ) {
            BeanUtils.copyProperties(assocGoodsInfo, prGoodsBase);
            prAssocGoodsInfoTrxMapper.insertAssociatedGoods(validatePrAssocGoodsInfo(assocGoodsInfo,INSERT_TYPE));
        }

        for ( PrAssocGoodsInfo assocGoodsInfo : updatedAssociatedGoodsList ) {
            BeanUtils.copyProperties(assocGoodsInfo, prGoodsBase);
            prAssocGoodsInfoTrxMapper.updateAssociatedGoodsInfo(validatePrAssocGoodsInfo(assocGoodsInfo,UPDATE_TYPE));
        }

        for ( PrAssocGoodsInfo assocGoodsInfo : deletedAssociatedGoodsList ) {
            BeanUtils.copyProperties(assocGoodsInfo, prGoodsBase);
            prAssocGoodsInfoTrxMapper.deleteAssociatedGoods(validatePrAssocGoodsInfo(assocGoodsInfo,DELETE_TYPE));
        }
    }

    private void validateGeneralGoods(GeneralGoodsRequest request) throws Exception {

        // ========== 상품기본 ========== //
        PrGoodsBase prGoodsBase = request.getPrGoodsBase();
        Validator.throwIfNull( prGoodsBase, MessageResolver.getMessage(NULL_ERROR_MSG, new String[] {"PrGoodsBase"}));

        Validator.throwIfEmpty( prGoodsBase.getGoodsNo()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","goodsNo"}));        // 상품번호
        Validator.throwIfEmpty( prGoodsBase.getGoodsNm()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","goodsNm"}));        // 상품명
        Validator.throwIfEmpty( prGoodsBase.getShrtGoodsNm()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","shrtGoodsNm"}));    // 단축상품명
        Validator.throwIfEmpty( prGoodsBase.getSafeCertiTgtYn(), MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","safeCertiTgtYn"})); // 안전인증대상여부
        Validator.throwIfEmpty( prGoodsBase.getBuyrAgeLmtCd()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","buyrAgeLmtCd"}));   // 구입자나이제한
        Validator.throwIfEmpty( prGoodsBase.getDispYn()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","dispYn"}));         // 전시여부
        Validator.throwIfEmpty( prGoodsBase.getSaleStatCd()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","saleStatCd"}));     // 판매상태
        Validator.throwIfEmpty( prGoodsBase.getSaleEndDtm()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","saleEndDtm"}));     // 판매종료일시
        Validator.throwIfEmpty( prGoodsBase.getStkMgrYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","stkMgrYn"}));       // 재고관리여부
        Validator.throwIfEmpty( prGoodsBase.getBuyQtyLmtYn()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","buyQtyLmtYn"}));    // 구매수량제한여부
        Validator.throwIfNull ( prGoodsBase.getMinLmtQty()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","minLmtQty"}));      // 최소제한수량
        Validator.throwIfNull ( prGoodsBase.getMaxLmtQty()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","maxLmtQty"}));      // 최대제한수량
        Validator.throwIfEmpty( prGoodsBase.getDeliGoodsGbCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","deliGoodsGbCd"}));  // 배송상품구분
        Validator.throwIfNull ( prGoodsBase.getDeliDday()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","deliDday"}));       // 배송기일
        Validator.throwIfEmpty( prGoodsBase.getTdaySndPsbYn()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","tdaySndPsbYn"}));   // 당일발송가능여부
        Validator.throwIfEmpty( prGoodsBase.getSdaySndPsbYn()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","sdaySndPsbYn"}));   // 토요일발송가능여부
        Validator.throwIfEmpty( prGoodsBase.getItmSoutNotiYn() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","itmSoutNotiYn"}));  // 단품품절알림여부
        Validator.throwIfEmpty( prGoodsBase.getDeliPolcNo()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","deliPolcNo"}));     // 배송정책번호
        Validator.throwIfEmpty( prGoodsBase.getBdlDeliPsbYn()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","bdlDeliPsbYn"}));   // 묶음배송여부
        Validator.throwIfEmpty( prGoodsBase.getBdlRtnPsbYn()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","bdlRtnPsbYn"}));    // 묶음반품가능여부
        Validator.throwIfEmpty( prGoodsBase.getRtnPsbYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","rtnPsbYn"}));       // 반품가능여부
        Validator.throwIfEmpty( prGoodsBase.getExchPsbYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","exchPsbYn"}));      // 교환가능여부
        Validator.throwIfEmpty( prGoodsBase.getPrcCompaExpYn() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","prcCompaExpYn"}));  // 가격비교노출여부
        Validator.throwIfEmpty( prGoodsBase.getSchPsbYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","schPsbYn"}));       // 검색가능여부

        // ========== 예약판매이력 ========== //
        if ( !StringUtils.isBlank(prGoodsBase.getSaleMethCd()) && PR003.RSV_SALE.isEquals(prGoodsBase.getSaleMethCd()) ) {
            PrRsvSaleHist prRsvSaleHist = request.getPrRsvSaleHist();
            Validator.throwIfNull( prRsvSaleHist, MessageResolver.getMessage(NULL_ERROR_MSG, new String[] {"PrRsvSaleHist"}));
            if(!StringUtils.isBlank(prRsvSaleHist.getRsvStopYn())){
                if("Y".equals(prRsvSaleHist.getRsvStopYn())){ // 예약중단
                    Validator.throwIfEmpty( prRsvSaleHist.getRsvStopCausCd()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRsvSaleHist","rsvStopCausCd"}));      // 예약중단사유코드
                }else { // 예약이력수정
                    Validator.throwIfEmpty( prRsvSaleHist.getFwdidcPrarDy()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRsvSaleHist","fwdidcPrarDy"}));       // 출고지시예정일자
                    Validator.throwIfEmpty( prRsvSaleHist.getRsvEndAfProcMethCd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRsvSaleHist","rsvEndAfProcMethCd"})); // 예약종료후판매방식
                }
            }
        }

        // ========== 상품항목정보 ========== //
        List<PrGoodsItemInfo> prGoodsItemInfoList = request.getPrGoodsItemInfoList();
        Validator.throwIfNull( prGoodsItemInfoList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[] {"PrGoodsItemInfo"}));
        for ( PrGoodsItemInfo itemInfo : prGoodsItemInfoList ) {
            Validator.throwIfEmpty( itemInfo.getGoodsNotiLisartCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","goodsNotiLisartCd"})); // 상품고시항목코드
            Validator.throwIfEmpty( itemInfo.getGoodsNotiItemCd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","goodsNotiItemCd"}));   // 상품고시품목코드
            Validator.throwIfEmpty( itemInfo.getNotiItemCmt()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","notiItemCmt"}));       // 고시항목내용
        }

        // ========== 상품안전인증이력 ========== //
        List<PrGoodsSafeCertiHist> prGoodsSafeCertiHistList = request.getPrGoodsSafeCertiHistList();
        if(!CollectionUtils.isEmpty(prGoodsSafeCertiHistList)){
            if ( "Y".equals(prGoodsBase.getSafeCertiTgtYn())) {
                for ( PrGoodsSafeCertiHist safeCertiHist : prGoodsSafeCertiHistList) {
                    Validator.throwIfEmpty( safeCertiHist.getSafeCertiGbCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","safeCertiGbCd"})); // 안전인증구분코드
                    Validator.throwIfEmpty( safeCertiHist.getSafeCertiNo()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","safeCertiNo"}));   // 안전인증번호
                    Validator.throwIfEmpty( safeCertiHist.getAplyStrDt()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","aplyStrDt"}));     // 적용시작일자
                    Validator.throwIfEmpty( safeCertiHist.getAplyEndDt()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsItemInfo","aplyEndDt"}));     // 적용시작일자
                }
            }
        }

        // ========== 상품결제수단정보 ========== //
        List<PrGoodsPayMeanInfo> prGoodsPayMeanInfoList = request.getPrGoodsPayMeanInfoList();
        Validator.throwIfNull( prGoodsPayMeanInfoList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[] {"PrGoodsPayMeanInfo"}));
        for ( PrGoodsPayMeanInfo payMeanInfo : prGoodsPayMeanInfoList ) {
            Validator.throwIfEmpty( payMeanInfo.getPayWayCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsPayMeanInfo","payWayCd"}));   // 결제수단코드
            Validator.throwIfEmpty( payMeanInfo.getUseYn()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsPayMeanInfo","useYn"}));      // 사용여부
        }

        // ========== 상품홍보문구이력 ========== //
        List<PrAdveWrdHist> prAdveWrdHistList = request.getPrAdveWrdHistList();
        if(!CollectionUtils.isEmpty(prAdveWrdHistList)){
            for ( PrAdveWrdHist advertisingWord : prAdveWrdHistList ) {
                Validator.throwIfEmpty( advertisingWord.getAplyStrDt() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrAdveWrdHist","aplyStrDt"})); // 적용시작일자
                Validator.throwIfEmpty( advertisingWord.getAplyEndDt() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrAdveWrdHist","aplyEndDt"})); // 적용종료일자
                Validator.throwIfEmpty( advertisingWord.getAdveWrd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrAdveWrdHist","adveWrd"}));   // 홍보문구
                Validator.throwIfEmpty( advertisingWord.getUseYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrAdveWrdHist","useYn"}));     // 사용여부
            }
        }

        // ========== 상품증정품이력 ========== //
        List<PrPrestHist> prPrestHistList = request.getPrPrestHistList();
        if(!CollectionUtils.isEmpty(prPrestHistList)){
            for ( PrPrestHist present : prPrestHistList ) {
                Validator.throwIfEmpty( present.getAplyStrDt() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPrestHist","aplyStrDt"})); // 적용시작일자
                Validator.throwIfEmpty( present.getAplyEndDt() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPrestHist","aplyEndDt"})); // 적용종료일자
                Validator.throwIfEmpty( present.getPrestNm()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPrestHist","prestNm"}));   // 증정품명
                Validator.throwIfEmpty( present.getUseYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPrestHist","useYn"}));     // 사용여부
            }
        }
    }

    private PrItmBase validatePrItmBase(PrItmBase itmBase) throws Exception{

        Validator.throwIfEmpty( itmBase.getGoodsNo()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrItmBase","goodsNo"}));        // 상품번호
        Validator.throwIfEmpty( itmBase.getItmNo()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrItmBase","itmNo"}));          // 단품번호
        Validator.throwIfNull ( itmBase.getStkQty()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrItmBase","stkQty"}));         // 재고수량
        Validator.throwIfEmpty( itmBase.getItmSaleStatCd()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrItmBase","itmSaleStatCd"}));  // 단품판매상태코드
        Validator.throwIfEmpty( itmBase.getSoutNotiYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrItmBase","soutNotiYn"}));     // 품절알림여부
        Validator.throwIfNull ( itmBase.getSoutNotiStdQty() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrItmBase","soutNotiStdQty"})); // 품절알림기준수량

        return itmBase;
    }

    private PrStdCtgDispInfo validatePrStdCtgDispInfo(PrStdCtgDispInfo prStdCtgDispInfo, String type) throws Exception {

        switch (type) {
            case INSERT_TYPE:
                Validator.throwIfEmpty(prStdCtgDispInfo.getUseYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "useYn"     })); // 사용여부
                Validator.throwIfEmpty(prStdCtgDispInfo.getSysRegId()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "sysRegId"  })); // 시스템 등록자 ID
            case UPDATE_TYPE:
                Validator.throwIfEmpty(prStdCtgDispInfo.getStdCtgNo()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "stdCtgNo"  })); // 표준카테고리번호
                Validator.throwIfEmpty(prStdCtgDispInfo.getDispCtgNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "dispCtgNo" })); // 전시카테고리번호
                Validator.throwIfEmpty(prStdCtgDispInfo.getRepCtgYn()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "repCtgYn"  })); // 대표카테고리여부
                Validator.throwIfEmpty(prStdCtgDispInfo.getSysModId()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "sysModId"  })); // 시스템 수정자 ID
                break;
            case DELETE_TYPE:
                Validator.throwIfEmpty(prStdCtgDispInfo.getStdCtgNo()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "stdCtgNo"  })); // 표준카테고리번호
                Validator.throwIfEmpty(prStdCtgDispInfo.getDispCtgNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrStdCtgDispInfo", "dispCtgNo" })); // 전시카테고리번호
                break;
        }

        return prStdCtgDispInfo;
    }

    private PrAssocGoodsInfo validatePrAssocGoodsInfo(PrAssocGoodsInfo prAssocGoodsInfo, String type) throws Exception {

        switch (type) {
            case INSERT_TYPE:
                Validator.throwIfEmpty(prAssocGoodsInfo.getAsctGbCd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "asctGbCd"    })); // 연관구분코드
                Validator.throwIfEmpty(prAssocGoodsInfo.getSysRegId()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "sysRegId"    })); // 시스템 등록자 ID
            case UPDATE_TYPE:
                Validator.throwIfEmpty(prAssocGoodsInfo.getGoodsNo()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "goodsNo"     })); // 상품번호
                Validator.throwIfEmpty(prAssocGoodsInfo.getAsctGoodsNo(), MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "asctGoodsNo" })); // 연관상품번호
                Validator.throwIfNull (prAssocGoodsInfo.getSortSeq()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "sortSeq"     })); // 정렬순서
                Validator.throwIfEmpty(prAssocGoodsInfo.getSysModId()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "sysModId"    })); // 시스템 수정자 ID
                break;
            case DELETE_TYPE:
                Validator.throwIfEmpty(prAssocGoodsInfo.getGoodsNo()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "goodsNo"     })); // 상품번호
                Validator.throwIfEmpty(prAssocGoodsInfo.getAsctGoodsNo(), MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrAssocGoodsInfo", "asctGoodsNo" })); // 연관상품번호
                break;
        }

        return prAssocGoodsInfo;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyPackageGoods(RawRealGridCUDRequest rawCUDRequest, PackageGoodsRequest request) throws Exception {

        validatePackageGoods(request);

        PrGoodsBase prGoodsBase = request.getPrGoodsBase();
        BeanUtils.copyProperties(prGoodsBase,request);

        // 기존 상품 기본 정보 조회
        PrGoodsBase prePrGoodsBase = prGoodsBaseMapper.getGoodsInfo(prGoodsBase.getGoodsNo());

        // 상품기본 수정
        prGoodsBaseTrxMapper.updatePkgPrGoodsBase(prGoodsBase);

        // 상품기본 수정 로그 생성
        insertGoodsModLog ( prePrGoodsBase, prGoodsBase );

        // 판매상태가 변경된 경우, 판매상태이력생성
        if(!prePrGoodsBase.getSaleStatCd().equals(prGoodsBase.getSaleStatCd())){

            PrItmSaleStatHist prItmSaleStatHist = new PrItmSaleStatHist();
            BeanUtils.copyProperties(prItmSaleStatHist, prGoodsBase);

            prItmSaleStatHist.setItmNo("0");
            prItmSaleStatHist.setGoodsItmGbCd(PR020.GOODS.getCd());
            prItmSaleStatHist.setItmSaleStatCd(prGoodsBase.getSaleStatCd());

            // 변경된 판매상태가 "품절"인 경우, 품절 사유코드 추가
            if(PR005.SOLD_OUT.isEquals(prGoodsBase.getSaleStatCd())){
                prItmSaleStatHist.setSoutCausCd(PR032.MANAGER.getCd());
            }

            // 기존 판매상태이력 변경
            prItmSaleStatHistTrxMapper.updatePrItmSaleStatHist(prItmSaleStatHist);

            // 신규 판매상태이력 추가
            prItmSaleStatHistTrxMapper.insertPrItmSaleStatHist(prItmSaleStatHist);
        }

        // 관계상품정보 수정
        updatePkgGoodsGridData( rawCUDRequest, prGoodsBase );
    }

    private void validatePackageGoods(PackageGoodsRequest request) throws Exception{

        // ========== 상품기본 ========== //
        PrGoodsBase prGoodsBase = request.getPrGoodsBase();
        Validator.throwIfNull( prGoodsBase, MessageResolver.getMessage(NULL_ERROR_MSG, new String[] {"PrGoodsBase"}));                                                 // 상품기본

        Validator.throwIfEmpty( prGoodsBase.getGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","goodsNo"}));            // 상품번호
        Validator.throwIfEmpty( prGoodsBase.getGoodsNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","goodsNm"}));            // 상품명
        Validator.throwIfEmpty( prGoodsBase.getBrandNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","brandNo"}));            // 브랜드번호
        Validator.throwIfEmpty( prGoodsBase.getModlNm()             , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","modlNm"}));             // 모델명
        Validator.throwIfEmpty( prGoodsBase.getHomeNm()             , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","homeNm"}));             // 원산지명
        Validator.throwIfEmpty( prGoodsBase.getMfcoNm()             , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","mfcoNm"}));             // 제조사명
        Validator.throwIfEmpty( prGoodsBase.getSalemnNm()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","salemnNm"}));           // 판매자명
        Validator.throwIfEmpty( prGoodsBase.getDispYn()             , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","dispYn"}));             // 전시여부
        Validator.throwIfEmpty( prGoodsBase.getSaleStatCd()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","saleStatCd"}));         // 판매상태
        Validator.throwIfEmpty( prGoodsBase.getSaleEndDtm()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","saleEndDtm"}));         // 판매종료일시
        Validator.throwIfEmpty( prGoodsBase.getPrcCompaExpYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","prcCompaExpYn"}));      // 가격비교노출여부
        Validator.throwIfEmpty( prGoodsBase.getSchPsbYn()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","schPsbYn"}));           // 검색가능여부
        Validator.throwIfEmpty( prGoodsBase.getPkgGoodsPrioRnkCd()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","pkgGoodsPrioRnkCd"}));  // 묶음삼품우선순위

        if ( "Y".equals(prGoodsBase.getSchPsbYn()) ){
            Validator.throwIfEmpty( prGoodsBase.getSchKwd1Nm()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","schKwd1Nm"}));          // 검색가능여부
            Validator.throwIfEmpty( prGoodsBase.getSchKwd2Nm()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","schKwd2Nm"}));          // 검색가능여부
            Validator.throwIfEmpty( prGoodsBase.getSchKwd3Nm()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrGoodsBase","schKwd3Nm"}));          // 검색가능여부
        }
    }

    private void updatePkgGoodsGridData(RawRealGridCUDRequest rawCUDRequest, PrGoodsBase prGoodsBase) throws Exception {

        // 관계상품정보 수정
        RealGridCUDRequest<PrRelGoodsInfo> packageRelatedGoodsListGridCUD
                = rawCUDRequest.getRequest("packageRelatedGoodsListGrid", PrRelGoodsInfo.class);
        List<PrRelGoodsInfo> updatedPrRelGoodsInfoList = packageRelatedGoodsListGridCUD.getUpdate();

        for ( PrRelGoodsInfo prRelGoodsInfo : updatedPrRelGoodsInfoList ) {
            BeanUtils.copyProperties(prRelGoodsInfo, prGoodsBase);
            prRelGoodsInfo.setBaseGoodsNo(prGoodsBase.getGoodsNo());
            prRelGoodsInfoTrxMapper.updatePrRelGoodsInfo(validatePrRelGoodsInfo(prRelGoodsInfo));
        }
    }

    private PrRelGoodsInfo validatePrRelGoodsInfo(PrRelGoodsInfo prRelGoodsInfo) throws Exception{

        Validator.throwIfEmpty( prRelGoodsInfo.getBaseGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRelGoodsInfo","baseGoodsNo"}));  // 기준상품번호
        Validator.throwIfEmpty( prRelGoodsInfo.getTgtGoodsNo()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRelGoodsInfo","tgtGoodsNo"}));   // 대상상품번호
        Validator.throwIfEmpty( prRelGoodsInfo.getRepYn()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRelGoodsInfo","repYn"}));        // 대표여부
        Validator.throwIfEmpty( prRelGoodsInfo.getSortSeq()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRelGoodsInfo","sortSeq"}));      // 정렬순서
        Validator.throwIfEmpty( prRelGoodsInfo.getSysModId()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrRelGoodsInfo","sysModId"}));     // 시스템 수정자 ID

        return prRelGoodsInfo;
    }

    /**
     * 상품기본 수정로그
     * @param 변경전 상품기본 정보 : prePrGoodsBase
     * @param 변경후 상품기본 정보 : postPrGoodsBase
     * @throws Exception
     */
    private void insertGoodsModLog(PrGoodsBase prePrGoodsBase, PrGoodsBase postPrGoodsBase) throws Exception {

        PrGoodsBaseModLog log = new PrGoodsBaseModLog();
        BeanUtils.copyProperties(log, postPrGoodsBase);

        // 안전인증대상여부
        if(!StringUtils.isBlank(postPrGoodsBase.getSafeCertiTgtYn())) {
            if ( !prePrGoodsBase.getSafeCertiTgtYn().equals(postPrGoodsBase.getSafeCertiTgtYn()) ) {
                log.setGoodsModItemCd(PR038.SAFE_CERTI_TGT_YN.getCd());
                log.setGoodsModCont(postPrGoodsBase.getSafeCertiTgtYn());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 구입자 나이제한코드
        if(!StringUtils.isBlank(postPrGoodsBase.getBuyrAgeLmtCd())) {
            if (!prePrGoodsBase.getBuyrAgeLmtCd().equals(postPrGoodsBase.getBuyrAgeLmtCd())) {
                log.setGoodsModItemCd(PR038.BUYR_AGE_LMT_CD.getCd());
                log.setGoodsModCont(postPrGoodsBase.getBuyrAgeLmtCd());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 전시여부
        if(!StringUtils.isBlank(postPrGoodsBase.getDispYn())) {
            if ( !prePrGoodsBase.getDispYn().equals(postPrGoodsBase.getDispYn())) {
                log.setGoodsModItemCd(PR038.DISP_YN.getCd());
                log.setGoodsModCont(postPrGoodsBase.getDispYn());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 판매상태코드
        if(!StringUtils.isBlank(postPrGoodsBase.getSaleStatCd())) {
            if ( !prePrGoodsBase.getSaleStatCd().equals(postPrGoodsBase.getSaleStatCd())) {
                log.setGoodsModItemCd(PR038.SALE_STAT_CD.getCd());
                log.setGoodsModCont(postPrGoodsBase.getSaleStatCd());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 재고관리여부
        if(!StringUtils.isBlank(postPrGoodsBase.getStkMgrYn())) {
            if ( !prePrGoodsBase.getStkMgrYn().equals(postPrGoodsBase.getStkMgrYn())) {
                log.setGoodsModItemCd(PR038.STK_MGR_YN.getCd());
                log.setGoodsModCont(postPrGoodsBase.getStkMgrYn());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 구매수량제한여부
        if(!StringUtils.isBlank(postPrGoodsBase.getBuyQtyLmtYn())) {
            if ( !prePrGoodsBase.getBuyQtyLmtYn().equals(postPrGoodsBase.getBuyQtyLmtYn())) {
                log.setGoodsModItemCd(PR038.BUY_QTY_LMT_YN.getCd());
                log.setGoodsModCont(postPrGoodsBase.getBuyQtyLmtYn());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 최소제한수량
        if(!Objects.isNull(postPrGoodsBase.getMinLmtQty())) {
            if ( !prePrGoodsBase.getMinLmtQty().equals(postPrGoodsBase.getMinLmtQty())) {
                log.setGoodsModItemCd(PR038.MIN_LMT_QTY.getCd());
                log.setGoodsModCont(String.valueOf(postPrGoodsBase.getMinLmtQty()));
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 최대제한수량
        if(!Objects.isNull(postPrGoodsBase.getMaxLmtQty())) {
            if ( !prePrGoodsBase.getMaxLmtQty().equals(postPrGoodsBase.getMaxLmtQty())) {
                log.setGoodsModItemCd(PR038.MAX_LMT_QTY.getCd());
                log.setGoodsModCont(String.valueOf(postPrGoodsBase.getMaxLmtQty()));
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 배송상품구분코드
        if(!StringUtils.isBlank(postPrGoodsBase.getDeliGoodsGbCd())) {
            if ( !prePrGoodsBase.getDeliGoodsGbCd().equals(postPrGoodsBase.getDeliGoodsGbCd())) {
                log.setGoodsModItemCd(PR038.DELI_GOODS_GB_CD.getCd());
                log.setGoodsModCont(postPrGoodsBase.getDeliGoodsGbCd());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 단품품절알림여부
        if(!StringUtils.isBlank(postPrGoodsBase.getItmSoutNotiYn())) {
            if ( !prePrGoodsBase.getItmSoutNotiYn().equals(postPrGoodsBase.getItmSoutNotiYn())) {
                log.setGoodsModItemCd(PR038.ITM_SOUT_NOTI_YN.getCd());
                log.setGoodsModCont(postPrGoodsBase.getItmSoutNotiYn());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 배송정책번호
        if(!StringUtils.isBlank(postPrGoodsBase.getDeliPolcNo())) {
            if ( !prePrGoodsBase.getDeliPolcNo().equals(postPrGoodsBase.getDeliPolcNo())) {
                log.setGoodsModItemCd(PR038.DELI_POLC_NO.getCd());
                log.setGoodsModCont(postPrGoodsBase.getDeliPolcNo());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 가격비교노출여부
        if(!StringUtils.isBlank(postPrGoodsBase.getPrcCompaExpYn())) {
            if ( !prePrGoodsBase.getPrcCompaExpYn().equals(postPrGoodsBase.getPrcCompaExpYn())) {
                log.setGoodsModItemCd(PR038.PRC_COMPA_EXP_YN.getCd());
                log.setGoodsModCont(postPrGoodsBase.getPrcCompaExpYn());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }

        // 판매방식코드
        if(!StringUtils.isBlank(postPrGoodsBase.getSaleMethCd())) {
            if ( !prePrGoodsBase.getSaleMethCd().equals(postPrGoodsBase.getSaleMethCd())) {
                log.setGoodsModItemCd(PR038.SALE_METH_CD.getCd());
                log.setGoodsModCont(postPrGoodsBase.getSaleMethCd());
                prGoodsBaseModLogTrxMapper.insertPrGoodsBaseModLog(log);
            }
        }
    }
}
