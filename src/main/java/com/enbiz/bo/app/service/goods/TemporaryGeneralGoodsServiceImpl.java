package com.enbiz.bo.app.service.goods;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.goods.DeliveryPolicyRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsOptionRequest;
import com.enbiz.bo.app.dto.request.goods.StandardCategoryDisplayRequest;
import com.enbiz.bo.app.dto.request.goods.TemporaryGeneralGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.DeliveryPolicyResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsOptionResponse;
import com.enbiz.bo.app.dto.response.goods.StandardCategoryDisplayResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryGeneralGoodsResponse;
import com.enbiz.bo.app.entity.PrGoodsNotiItemCd;
import com.enbiz.bo.app.entity.PrPregAdveWrdHist;
import com.enbiz.bo.app.entity.PrPregAssocGoodsInfo;
import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsItemInfo;
import com.enbiz.bo.app.entity.PrPregGoodsPayMeanInfo;
import com.enbiz.bo.app.entity.PrPregGoodsPrcHist;
import com.enbiz.bo.app.entity.PrPregGoodsSafeCertiHist;
import com.enbiz.bo.app.entity.PrPregItmBase;
import com.enbiz.bo.app.entity.PrPregItmOptnInfo;
import com.enbiz.bo.app.entity.PrPregPrestHist;
import com.enbiz.bo.app.entity.PrPregRsvSaleHist;
import com.enbiz.bo.app.entity.PrStdCtgDispInfo;
import com.enbiz.bo.app.enums.PR001;
import com.enbiz.bo.app.enums.PR003;
import com.enbiz.bo.app.enums.PR024;
import com.enbiz.bo.app.enums.PR029;
import com.enbiz.bo.app.repository.display.PrStdCtgDispInfoMapper;
import com.enbiz.bo.app.repository.display.PrStdCtgDispInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsNotiItemCdMapper;
import com.enbiz.bo.app.repository.goods.PrOptnCdMapper;
import com.enbiz.bo.app.repository.goods.PrOptnClssCdMapper;
import com.enbiz.bo.app.repository.goods.PrPregAdveWrdHistMapper;
import com.enbiz.bo.app.repository.goods.PrPregAdveWrdHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregAssocGoodsInfoMapper;
import com.enbiz.bo.app.repository.goods.PrPregAssocGoodsInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsBaseMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsBaseTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsItemInfoMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsItemInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsPayMeanInfoMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsPayMeanInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsPrcHistMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsPrcHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsSafeCertiHistMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsSafeCertiHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregItmBaseMapper;
import com.enbiz.bo.app.repository.goods.PrPregItmBaseTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregItmOptnInfoMapper;
import com.enbiz.bo.app.repository.goods.PrPregItmOptnInfoTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregPrestHistMapper;
import com.enbiz.bo.app.repository.goods.PrPregPrestHistTrxMapper;
import com.enbiz.bo.app.repository.goods.PrPregRsvSaleHistMapper;
import com.enbiz.bo.app.repository.goods.PrPregRsvSaleHistTrxMapper;
import com.enbiz.bo.app.repository.vendor.EtDeliPolcBaseMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ReflectionUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 임시 일반상품 ServiceImpl
 */
@Service
@Slf4j
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class TemporaryGeneralGoodsServiceImpl implements TemporaryGeneralGoodsService{

    private static final String EMPTY_ERROR_MSG = "generalGoods.err.msg.noSaveRequiredValueError";
    private static final String NULL_ERROR_MSG = "generalGoods.err.msg.isNullError";

    private static final String INSERT_TYPE = "I";
    private static final String UPDATE_TYPE = "U";
    private static final String DELETE_TYPE = "D";

    /* 상품기본 */
    private final PrPregGoodsBaseMapper prPregGoodsBaseMapper;
    private final PrPregGoodsBaseTrxMapper prPregGoodsBaseTrxMapper;

    /* 예약판매이력 */
    private final PrPregRsvSaleHistMapper prPregRsvSaleHistMapper;
    private final PrPregRsvSaleHistTrxMapper prPregRsvSaleHistTrxMapper;

    /* 상품고시항목코드 */
    private final PrGoodsNotiItemCdMapper prGoodsNotiItemCdMapper;

    /* 상품항목정보 */
    private final PrPregGoodsItemInfoMapper prPregGoodsItemInfoMapper;
    private final PrPregGoodsItemInfoTrxMapper prPregGoodsItemInfoTrxMapper;

    /* 상품안전인증이력 */
    private final PrPregGoodsSafeCertiHistMapper prPregGoodsSafeCertiHistMapper;
    private final PrPregGoodsSafeCertiHistTrxMapper prPregGoodsSafeCertiHistTrxMapper;

    /* 상품가격이력 */
    private final PrPregGoodsPrcHistMapper prPregGoodsPrcHistMapper;
    private final PrPregGoodsPrcHistTrxMapper prPregGoodsPrcHistTrxMapper;

    /* 상품결제수단정보 */
    private final PrPregGoodsPayMeanInfoMapper prPregGoodsPayMeanInfoMapper;
    private final PrPregGoodsPayMeanInfoTrxMapper prPregGoodsPayMeanInfoTrxMapper;

    /* 단품옵션정보 */
    private final PrPregItmOptnInfoMapper prPregItmOptnInfoMapper;
    private final PrPregItmOptnInfoTrxMapper prPregItmOptnInfoTrxMapper;

    /* 단품기본 */
    private final PrPregItmBaseMapper prPregItmBaseMapper;
    private final PrPregItmBaseTrxMapper prPregItmBaseTrxMapper;

    /* 상품홍보문구이력 */
    private final PrPregAdveWrdHistMapper prPregAdveWrdHistMapper;
    private final PrPregAdveWrdHistTrxMapper prPregAdveWrdHistTrxMapper;

    /* 증정품 이력 */
    private final PrPregPrestHistMapper prPregPrestHistMapper;
    private final PrPregPrestHistTrxMapper prPregPrestHistTrxMapper;

    /*  표준카테고리전시정보 */
    private final PrStdCtgDispInfoMapper prStdCtgDispInfoMapper;
    private final PrStdCtgDispInfoTrxMapper prStdCtgDispInfoTrxMapper;

    /* 연관상품정보 */
    private final PrPregAssocGoodsInfoMapper prPregAssocGoodsInfoMapper;
    private final PrPregAssocGoodsInfoTrxMapper prPregAssocGoodsInfoTrxMapper;

    private final PrOptnClssCdMapper prOptnClssCdMapper;        // 옵션분류코드
    private final PrOptnCdMapper prOptnCdMapper;                // 옵션코드
    private final EtDeliPolcBaseMapper etDeliPolcBaseMapper;    // 배송정책기본


    @Override
    public List<DeliveryPolicyResponse> getDeliveryPolicyList(DeliveryPolicyRequest request) throws Exception {
        return etDeliPolcBaseMapper.getEntrDeliveryPolicyList(request.getEntrNo());
    }

    @Override
    public List<PrGoodsNotiItemCd> getGoodsNotificationItemList(String goodsNotiLisartCd) throws Exception {
        return prGoodsNotiItemCdMapper.getGoodsNotiItemCdList(goodsNotiLisartCd);
    }

    @Override
    public List<GoodsOptionResponse> getOptionCategoryList(GoodsOptionRequest request) throws Exception {
        return prOptnClssCdMapper.getPrOptnClssCdListFromGoods(request);
    }

    @Override
    public List<GoodsOptionResponse> getOptionList(GoodsOptionRequest request) throws Exception {
        return prOptnCdMapper.getPrOptnCdListFromGoods(request);
    }

    @Override
    public List<StandardCategoryDisplayResponse> getDisplayCategoryListByStandardCategory(StandardCategoryDisplayRequest request) throws Exception {
        List<StandardCategoryDisplayResponse> result = prStdCtgDispInfoMapper.getPrStdCtgDispInfoListFromGoods(request.getStdCtgNo());
        return result;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registTemporaryGeneralGoods(RawRealGridCUDRequest rawCUDRequest, TemporaryGeneralGoodsRequest request) throws Exception {

        ReflectionUtils.convertAnnotationEmptyToNull(request);

        // ========== 가등록상품기본 ========== //

        PrPregGoodsBase prPregGoodsBase = new PrPregGoodsBase();
        BeanUtils.copyProperties(prPregGoodsBase, request);

        prPregGoodsBase.setRegInfPathCd(PR029.BO_SYSTEM.getCd()); // 등록유입경로 : BO시스템
        prPregGoodsBase.setGoodsCompCd(PR001.GEN_GOODS.getCd());  // 상품구성코드 : 일반상품

        prPregGoodsBaseTrxMapper.insertPregGoods(validatePrPregGoodsBase(prPregGoodsBase, INSERT_TYPE));

        // ========== 가등록예약판매이력 ========== //

        if (PR003.RSV_SALE.isEquals(prPregGoodsBase.getSaleMethCd())) { // 판매방식이 예약판매인 경우
            PrPregRsvSaleHist prPregRsvSaleHist = request.getPrPregRsvSaleHist();
            Validator.throwIfNull(prPregRsvSaleHist, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록예약판매이력"}));
            BeanUtils.copyProperties(prPregRsvSaleHist, prPregGoodsBase);
            prPregRsvSaleHistTrxMapper.insertPregRsvSalesHist(validatePrPregRsvSaleHist(prPregRsvSaleHist));
        }

        // ========== 가등록상품항목정보 ========== //

        List<PrPregGoodsItemInfo> prPregGoodsItemInfoList = request.getPrPregGoodsItemInfoList();
        Validator.throwIfNull(prPregGoodsItemInfoList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품항목정보"}));
        for (PrPregGoodsItemInfo itemInfo : prPregGoodsItemInfoList) {
            BeanUtils.copyProperties(itemInfo, prPregGoodsBase);
            prPregGoodsItemInfoTrxMapper.insertPregGoodsItem(validatePrPregGoodsItemInfo(itemInfo));
        }

        // ========== 가등록상품안전인증이력 ========== //

        List<PrPregGoodsSafeCertiHist> prPregGoodsSafeCertiHistList = request.getPrPregGoodsSafeCertiHistList();
        if ("Y".equals(prPregGoodsBase.getSafeCertiTgtYn())) {
            Validator.throwIfNull(prPregGoodsSafeCertiHistList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품안전인증이력"}));
            for (PrPregGoodsSafeCertiHist safeCertiInfo : prPregGoodsSafeCertiHistList) {
                BeanUtils.copyProperties(safeCertiInfo, prPregGoodsBase);
                prPregGoodsSafeCertiHistTrxMapper.insertPregGoodsSafeCertiHist(validatePrPregGoodsSafeCertiHist(safeCertiInfo));
            }
        }

        // ========== 가등록상품가격이력 ========== //

        PrPregGoodsPrcHist prPregGoodsPrcHist = request.getPrPregGoodsPrcHist();
        Validator.throwIfNull(prPregGoodsPrcHist, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품가격이력"}));

        BeanUtils.copyProperties(prPregGoodsPrcHist, prPregGoodsBase);
        prPregGoodsPrcHistTrxMapper.insertPregGoodsPriceHist(validatePrPregGoodsPrcHist(prPregGoodsPrcHist));

        // ========== 가등록상품결제수단정보 ========== //

        List<PrPregGoodsPayMeanInfo> prPregGoodsPayMeanInfoList = request.getPrPregGoodsPayMeanInfoList();
        Validator.throwIfNull(prPregGoodsPayMeanInfoList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품결제수단정보"}));

        for (PrPregGoodsPayMeanInfo payMeanInfo : prPregGoodsPayMeanInfoList) {
            BeanUtils.copyProperties(payMeanInfo, prPregGoodsBase);
            prPregGoodsPayMeanInfoTrxMapper.insertPregGoodsPayMeanInfo(validatePrPregGoodsPayMeanInfo(payMeanInfo));
        }

        // ========== 가등록단품옵션정보 ========== //

        List<PrPregItmOptnInfo> prPregItmOptnInfoList = request.getPrPregItmOptnInfoList();
        if (!CollectionUtils.isEmpty(prPregItmOptnInfoList)) {
            for (PrPregItmOptnInfo itemInfo : prPregItmOptnInfoList) {
                BeanUtils.copyProperties(itemInfo, prPregGoodsBase);
                prPregItmOptnInfoTrxMapper.insertPregItmOptnInfo(validatePrPregItmOptnInfo(itemInfo));
            }
        }

        // ========== 가등록단품기본 ========== //

        List<PrPregItmBase> prPregItmBaseList = request.getPrPregItmBaseList();
        if (!CollectionUtils.isEmpty(prPregItmBaseList)) {
            for (PrPregItmBase item : prPregItmBaseList) {
                BeanUtils.copyProperties(item, prPregGoodsBase);
                prPregItmBaseTrxMapper.insertPregItem(validatePrPregItmBase(item));
            }
        }

        // ========== 가등록 상품홍보문구이력 ========== //

        List<PrPregAdveWrdHist> prPregAdveWrdHistList = request.getPrPregAdveWrdHistList();
        if (!CollectionUtils.isEmpty(prPregAdveWrdHistList)) {
            for (PrPregAdveWrdHist advertisingWord : prPregAdveWrdHistList) {
                BeanUtils.copyProperties(advertisingWord, prPregGoodsBase);
                prPregAdveWrdHistTrxMapper.insertPregAdveWrdHist(validatePrPregAdveWrdHist(advertisingWord));
            }
        }

        // ========== 가등록증정품이력 ========== //

        List<PrPregPrestHist> prPregPrestHistList = request.getPrPregPrestHistList();
        if (!CollectionUtils.isEmpty(prPregPrestHistList)) {
            for (PrPregPrestHist present : prPregPrestHistList) {
                BeanUtils.copyProperties(present, prPregGoodsBase);
                prPregPrestHistTrxMapper.insertPregPrestHist(validatePrPregPrestHist(present));
            }
        }

        // ========== 표준카테고리전시정보 & 가등록연계상품정보 ========== //

        insertGoodsGridData(rawCUDRequest, prPregGoodsBase);

        // ========== 가등록상품컨텐츠정보 ========== //

    }

    @Override
    public TemporaryGeneralGoodsResponse getTemporaryGeneralGoodsInfo(String pregGoodsNo) throws Exception {

        // 가등록상품기본 조회
        TemporaryGeneralGoodsResponse response = prPregGoodsBaseMapper.getTemporaryGeneralGoodsInfo(pregGoodsNo);

        // 판매방식이 예약판매인 경우, 가등록 예약판매이력 조회
        if (PR003.RSV_SALE.isEquals(response.getSaleMethCd())) {
            response.setPrPregRsvSaleHist(prPregRsvSaleHistMapper.getPregRsvSalesHist(pregGoodsNo));
        }

        // 가등록 상품 항목 정보 목록 조회
        response.setPrPregGoodsItemInfoList(prPregGoodsItemInfoMapper.getPregGoodsItemList(pregGoodsNo));

        // 안전인증대상여부인 경우, 가등록 상품안전인증이력 조회
        if ("Y".equals(response.getSafeCertiTgtYn())) {
            response.setPrPregGoodsSafeCertiHistList(prPregGoodsSafeCertiHistMapper.getPregGoodsSafeCertiHistList(pregGoodsNo));
        }

        // 가등록 상품가격이력 조회
        response.setPrPregGoodsPrcHist(prPregGoodsPrcHistMapper.getPregGoodsPriceHist(pregGoodsNo));

        // 가등록 상품결제수단 목록 조회
        response.setPrPregGoodsPayMeanInfoList(prPregGoodsPayMeanInfoMapper.getPregGoodsPayMeanInfoList(pregGoodsNo));

        // 옵션분류별 옵션번호로 정렬된 가등록 단품 옵션 목록 조회
        response.setPrPregItmOptnInfoList(prPregItmOptnInfoMapper.getClassifiedPregItmOptnInfoList(pregGoodsNo));

        // 가등록 단품 목록 조회
        response.setPrPregItmBaseList(prPregItmBaseMapper.getPregItemList(pregGoodsNo));

        // 표준카테고리전시정보 목록 조회
        response.setPrStdCtgDispInfoList(prStdCtgDispInfoMapper.getPrStdCtgDispInfoListFromGoods(response.getStdCtgNo()));

        // 가등록 연계상품정보 목록 조회
        response.setPrPregAssocGoodsInfoList(prPregAssocGoodsInfoMapper.getPregAssocGoodsList(pregGoodsNo));

        // 가등록 상품홍보문구이력 조회
        response.setPrPregAdveWrdHistList(prPregAdveWrdHistMapper.getPregAdveWrdHistList(pregGoodsNo));

        // 가등록 증정품 이력 조회
        response.setPrPregPrestHistList(prPregPrestHistMapper.getPregPrestHist(pregGoodsNo));

        return response;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyTemporaryGeneralGoods(RawRealGridCUDRequest rawCUDRequest, TemporaryGeneralGoodsRequest request) throws Exception {

        ReflectionUtils.convertAnnotationEmptyToNull(request);

        // ========== 가등록상품기본 ========== //

        PrPregGoodsBase prPregGoodsBase = new PrPregGoodsBase();
        BeanUtils.copyProperties(prPregGoodsBase, request);

        // 승인상태가 반려인 경우, 임시저장으로 상태 변경, 반려 정보 초기화
        if (PR024.RETURN.isEquals(prPregGoodsBase.getPregStatCd())) {
            prPregGoodsBase.setPregStatCd(PR024.SAVED.getCd());
            prPregGoodsBase.setRetnCaus(null);
            prPregGoodsBase.setRetnCausCd(null);
            prPregGoodsBase.setRetnDt(null);
        }

        prPregGoodsBaseTrxMapper.updatePregGoodsInfo(validatePrPregGoodsBase(prPregGoodsBase, UPDATE_TYPE));
        String pregGoodsNo = prPregGoodsBase.getPregGoodsNo();

        // ========== 가등록예약판매이력 ========== //

        if (PR003.RSV_SALE.isEquals(prPregGoodsBase.getSaleMethCd())) { // 판매방식이 예약판매인 경우
            PrPregRsvSaleHist prPregRsvSaleHist = request.getPrPregRsvSaleHist();
            Validator.throwIfNull(prPregRsvSaleHist, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록예약판매이력"}));
            BeanUtils.copyProperties(prPregRsvSaleHist, prPregGoodsBase);
            prPregRsvSaleHistTrxMapper.updatePregRsvSalesHist(validatePrPregRsvSaleHist(prPregRsvSaleHist));
        }

        // ========== 가등록상품항목정보 ========== //

        List<PrPregGoodsItemInfo> prPregGoodsItemInfoList = request.getPrPregGoodsItemInfoList();
        Validator.throwIfNull(prPregGoodsItemInfoList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품항목정보"}));

        String preCode = prPregGoodsItemInfoMapper.getPregGoodsNotiLisartCode(pregGoodsNo);
        String postCode = prPregGoodsItemInfoList.get(0).getGoodsNotiLisartCd();

        if (preCode.equals(postCode)) { // 수정

            for (PrPregGoodsItemInfo itemInfo : prPregGoodsItemInfoList) {
                BeanUtils.copyProperties(itemInfo, prPregGoodsBase);
                prPregGoodsItemInfoTrxMapper.updatePregGoodsItemInfo(validatePrPregGoodsItemInfo(itemInfo));
            }

        } else { // 삭제 후 재등록
            prPregGoodsItemInfoTrxMapper.deletePregGoodsItemInfo(pregGoodsNo);

            for (PrPregGoodsItemInfo itemInfo : prPregGoodsItemInfoList) {
                BeanUtils.copyProperties(itemInfo, prPregGoodsBase);
                prPregGoodsItemInfoTrxMapper.insertPregGoodsItem(validatePrPregGoodsItemInfo(itemInfo));
            }
        }

        // ========== 가등록상품안전인증이력 ========== //

        List<PrPregGoodsSafeCertiHist> prPregGoodsSafeCertiHistList = request.getPrPregGoodsSafeCertiHistList();

        // 기 등록된 상품안전인증이력 삭제
        prPregGoodsSafeCertiHistTrxMapper.deletePregGoodsSafeCertiHist(pregGoodsNo);

        // 재등록
        if ("Y".equals(prPregGoodsBase.getSafeCertiTgtYn())) {
            Validator.throwIfNull(prPregGoodsSafeCertiHistList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품안전인증이력"}));
            for (PrPregGoodsSafeCertiHist safeCertiInfo : prPregGoodsSafeCertiHistList) {
                BeanUtils.copyProperties(safeCertiInfo, prPregGoodsBase);
                prPregGoodsSafeCertiHistTrxMapper.insertPregGoodsSafeCertiHist(validatePrPregGoodsSafeCertiHist(safeCertiInfo));
            }
        }

        // ========== 가등록상품가격이력 ========== //

        PrPregGoodsPrcHist prPregGoodsPrcHist = request.getPrPregGoodsPrcHist();
        Validator.throwIfNull(prPregGoodsPrcHist, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품가격이력"}));

        BeanUtils.copyProperties(prPregGoodsPrcHist, prPregGoodsBase);
        prPregGoodsPrcHistTrxMapper.updatePregGoodsPriceHist(validatePrPregGoodsPrcHist(prPregGoodsPrcHist));

        // ========== 가등록상품결제수단정보 ========== //

        List<PrPregGoodsPayMeanInfo> prPregGoodsPayMeanInfoList = request.getPrPregGoodsPayMeanInfoList();
        Validator.throwIfNull(prPregGoodsPayMeanInfoList, MessageResolver.getMessage(NULL_ERROR_MSG, new String[]{"가등록상품결제수단정보"}));

        // 기 등록된 상품결제수단정보 삭제
        prPregGoodsPayMeanInfoTrxMapper.deletePregGoodsPayMeanInfo(pregGoodsNo);

        // 재등록
        for (PrPregGoodsPayMeanInfo payMeanInfo : prPregGoodsPayMeanInfoList) {
            BeanUtils.copyProperties(payMeanInfo, prPregGoodsBase);
            prPregGoodsPayMeanInfoTrxMapper.insertPregGoodsPayMeanInfo(validatePrPregGoodsPayMeanInfo(payMeanInfo));
        }

        // ========== 가등록단품옵션정보 ========== //

        List<PrPregItmOptnInfo> prPregItmOptnInfoList = request.getPrPregItmOptnInfoList();

        // 기 등록된 가등록 단품옵션정보 삭제
        prPregItmOptnInfoTrxMapper.deletePregItmOptnInfo(pregGoodsNo);

        // 재등록
        if (!CollectionUtils.isEmpty(prPregItmOptnInfoList)) {
            for (PrPregItmOptnInfo itemInfo : prPregItmOptnInfoList) {
                BeanUtils.copyProperties(itemInfo, prPregGoodsBase);
                prPregItmOptnInfoTrxMapper.insertPregItmOptnInfo(validatePrPregItmOptnInfo(itemInfo));
            }
        }

        // ========== 가등록단품기본 ========== //

        List<PrPregItmBase> prPregItmBaseList = request.getPrPregItmBaseList();

        // 기 등록된 가등록 단품기본 삭제
        prPregItmBaseTrxMapper.deletePregItmBase(pregGoodsNo);

        // 재등록
        if (!CollectionUtils.isEmpty(prPregItmBaseList)) {
            for (PrPregItmBase item : prPregItmBaseList) {
                BeanUtils.copyProperties(item, prPregGoodsBase);
                prPregItmBaseTrxMapper.insertPregItem(validatePrPregItmBase(item));
            }
        }

        // ========== 가등록 상품홍보문구이력 ========== //

        List<PrPregAdveWrdHist> prPregAdveWrdHistList = request.getPrPregAdveWrdHistList();
        prPregAdveWrdHistTrxMapper.deletePregAdveWrdHist(pregGoodsNo);          // 전체삭제
        if (!CollectionUtils.isEmpty(prPregAdveWrdHistList)) {            // 재등록
            for (PrPregAdveWrdHist advertisingWord : prPregAdveWrdHistList) {
                BeanUtils.copyProperties(advertisingWord, prPregGoodsBase);
                prPregAdveWrdHistTrxMapper.insertPregAdveWrdHist(validatePrPregAdveWrdHist(advertisingWord));
            }
        }

        // ========== 가등록증정품이력 ========== //

        List<PrPregPrestHist> prPregPrestHistList = request.getPrPregPrestHistList();
        prPregPrestHistTrxMapper.deletePregPrestHist(pregGoodsNo);
        if (!CollectionUtils.isEmpty(prPregPrestHistList)) {
            for (PrPregPrestHist present : prPregPrestHistList) {
                BeanUtils.copyProperties(present, prPregGoodsBase);
                prPregPrestHistTrxMapper.insertPregPrestHist(validatePrPregPrestHist(present));
            }
        }

        // ========== 표준카테고리전시정보 & 가등록연계상품정보 ========== //
        insertGoodsGridData(rawCUDRequest, prPregGoodsBase);

        // ========== 가등록상품컨텐츠정보 ========== //

    }

    private void insertGoodsGridData(RawRealGridCUDRequest rawCUDRequest, PrPregGoodsBase prPregGoodsBase) throws Exception {

        CurrentUser currentUser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 표준카테고리 전시정보 저장
        RealGridCUDRequest<PrStdCtgDispInfo> dispCtgGridCUD
                = rawCUDRequest.getRequest("dispCtgGrid", PrStdCtgDispInfo.class);
        List<PrStdCtgDispInfo> createdStdCtgDispInfoList = dispCtgGridCUD.getCreate();
        List<PrStdCtgDispInfo> updatedStdCtgDispInfoList = dispCtgGridCUD.getUpdate();
        List<PrStdCtgDispInfo> deletedStdCtgDispInfoList = dispCtgGridCUD.getDelete();

        for (PrStdCtgDispInfo stdCtgDispInfo : createdStdCtgDispInfoList) {
            stdCtgDispInfo.setSysRegId(currentUser.getLoginId());
            prStdCtgDispInfoTrxMapper.insertPrStdCtgDispInfoFromGoods(validatePrStdCtgDispInfo(stdCtgDispInfo, INSERT_TYPE));
        }

        for (PrStdCtgDispInfo stdCtgDispInfo : updatedStdCtgDispInfoList) {
            stdCtgDispInfo.setSysModId(currentUser.getLoginId());
            prStdCtgDispInfoTrxMapper.updatePrStdCtgDispInfoFromGoods(validatePrStdCtgDispInfo(stdCtgDispInfo, UPDATE_TYPE));
        }

        for (PrStdCtgDispInfo stdCtgDispInfo : deletedStdCtgDispInfoList) {
            prStdCtgDispInfoTrxMapper.deletePrStdCtgDispInfoFromGoods(validatePrStdCtgDispInfo(stdCtgDispInfo, DELETE_TYPE));
        }

        // 가등록 연계상품정보 저장
        RealGridCUDRequest<PrPregAssocGoodsInfo> assocGoodsGridCUD
                = rawCUDRequest.getRequest("assocGoodsGrid", PrPregAssocGoodsInfo.class);
        List<PrPregAssocGoodsInfo> createdAssociatedGoodsList = assocGoodsGridCUD.getCreate();
        List<PrPregAssocGoodsInfo> updatedAssociatedGoodsList = assocGoodsGridCUD.getUpdate();
        List<PrPregAssocGoodsInfo> deletedAssociatedGoodsList = assocGoodsGridCUD.getDelete();

        for (PrPregAssocGoodsInfo assocGoodsInfo : createdAssociatedGoodsList) {
            BeanUtils.copyProperties(assocGoodsInfo, prPregGoodsBase);
            prPregAssocGoodsInfoTrxMapper.insertPregAssocGoods(validatePrPregAssocGoodsInfo(assocGoodsInfo, INSERT_TYPE));
        }

        for (PrPregAssocGoodsInfo assocGoodsInfo : updatedAssociatedGoodsList) {
            BeanUtils.copyProperties(assocGoodsInfo, prPregGoodsBase);
            prPregAssocGoodsInfoTrxMapper.updatePregAssocGoodsInfo(validatePrPregAssocGoodsInfo(assocGoodsInfo, UPDATE_TYPE));
        }

        for (PrPregAssocGoodsInfo assocGoodsInfo : deletedAssociatedGoodsList) {
            BeanUtils.copyProperties(assocGoodsInfo, prPregGoodsBase);
            prPregAssocGoodsInfoTrxMapper.deletePregAssocGoods(validatePrPregAssocGoodsInfo(assocGoodsInfo, DELETE_TYPE));
        }
    }

    /**
     * 가등록상품기본 유효성 체크
     */
    private PrPregGoodsBase validatePrPregGoodsBase(PrPregGoodsBase prPregGoodsBase, String type) throws Exception {

        if (INSERT_TYPE.equals(type)) {
            Validator.throwIfEmpty(prPregGoodsBase.getEntrNo()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "entrNo"}));          // 협력사번호
            Validator.throwIfEmpty(prPregGoodsBase.getGoodsTypCd()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "goodsTypCd"}));      // 상품유형코드
            Validator.throwIfEmpty(prPregGoodsBase.getSaleMethCd()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "saleMethCd"}));      // 판매방식코드
            Validator.throwIfEmpty(prPregGoodsBase.getBuyTypCd()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "buyTypCd"}));        // 매입형태코드
            Validator.throwIfEmpty(prPregGoodsBase.getDeliProcTypCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "deliProcTypCd"}));   // 배송처리유형코드
            Validator.throwIfEmpty(prPregGoodsBase.getSysRegId()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "sysRegId"}));        // 시스템 등록자 ID
        } else if (UPDATE_TYPE.equals(type)) {
            Validator.throwIfEmpty(prPregGoodsBase.getPregGoodsNo()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "pregGoodsNo"}));     // 가등록상품번호
            Validator.throwIfEmpty(prPregGoodsBase.getSysModId()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "sysModId"}));        // 시스템 수정자 ID
        }

        Validator.throwIfEmpty(prPregGoodsBase.getGoodsNm()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "goodsNm"}));         // 상품명
        Validator.throwIfEmpty(prPregGoodsBase.getShrtGoodsNm()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "shrtGoodsNm"}));     // 단축상품명
        Validator.throwIfEmpty(prPregGoodsBase.getPregStatCd()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "pregStatCd"}));      // 가등록상태코드
        Validator.throwIfEmpty(prPregGoodsBase.getStdCtgNo()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "stdCtgNo"}));        // 표준카테고리번호
        Validator.throwIfEmpty(prPregGoodsBase.getBrandNo()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "brandNo"}));         // 브랜드번호
        Validator.throwIfEmpty(prPregGoodsBase.getModlNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "modlNm"}));          // 모델명
        Validator.throwIfEmpty(prPregGoodsBase.getHomeNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "homeNm"}));          // 원산지명
        Validator.throwIfEmpty(prPregGoodsBase.getMfcoNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "mfcoNm"}));          // 제조사명
        Validator.throwIfEmpty(prPregGoodsBase.getSalemnNm()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "salemnNm"}));        // 판매자명
        Validator.throwIfEmpty(prPregGoodsBase.getSafeCertiTgtYn()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "safeCertiTgtYn"}));  // 안전인증대상여부
        Validator.throwIfEmpty(prPregGoodsBase.getBuyrAgeLmtCd()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "buyrAgeLmtCd"}));    // 구입자나이제한코드
        Validator.throwIfEmpty(prPregGoodsBase.getDispYn()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "dispYn"}));          // 전시여부
        Validator.throwIfEmpty(prPregGoodsBase.getSaleStrDtm()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "saleStrDtm"}));      // 판매시작일시
        Validator.throwIfEmpty(prPregGoodsBase.getSaleEndDtm()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "saleEndDtm"}));      // 판매종료일시
        Validator.throwIfEmpty(prPregGoodsBase.getTaxGbCd()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "taxGbCd"}));         // 과면세구분코드
        Validator.throwIfEmpty(prPregGoodsBase.getStkMgrYn()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "stkMgrYn"}));        // 재고관리여부
        Validator.throwIfEmpty(prPregGoodsBase.getBuyQtyLmtYn()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "buyQtyLmtYn"}));     // 구매수량제한여부
        Validator.throwIfEmpty(prPregGoodsBase.getDeliGoodsGbCd()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "deliGoodsGbCd"}));   // 배송상품구분코드
        Validator.throwIfEmpty(prPregGoodsBase.getDeliWayCd()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "deliWayCd"}));       // 배송수단코드
        Validator.throwIfNull(prPregGoodsBase.getDeliDday()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "deliDday"}));        // 배송기일
        Validator.throwIfEmpty(prPregGoodsBase.getTdaySndPsbYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "tdaySndPsbYn"}));    // 당일발송가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getSdaySndPsbYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "sdaySndPsbYn"}));    // 토요일발송가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getItmSoutNotiYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "itmSoutNotiYn"}));   // 단품품절알림여부
        Validator.throwIfEmpty(prPregGoodsBase.getDeliPolcNo()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "deliPolcNo"}));      // 배송정책번호
        Validator.throwIfEmpty(prPregGoodsBase.getBdlDeliPsbYn()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "bdlDeliPsbYn"}));    // 묶음배송가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getBdlRtnPsbYn()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "bdlRtnPsbYn"}));     // 묶음반품가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getRtnPsbYn()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "rtnPsbYn"}));        // 반품가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getExchPsbYn()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "exchPsbYn"}));       // 교환가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getPrcCompaExpYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "prcCompaExpYn"}));   // 가격비교노출여부
        Validator.throwIfEmpty(prPregGoodsBase.getSchPsbYn()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "schPsbYn"}));        // 검색가능여부

        // 구매수량제한여부가 "Y"인 경우
        if ("Y".equals(prPregGoodsBase.getBuyQtyLmtYn())) {
            Validator.throwIfNull(prPregGoodsBase.getMinLmtQty()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", " minLmtQty"}));     // 최소제한수량
            Validator.throwIfNull(prPregGoodsBase.getMaxLmtQty()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", " maxLmtQty"}));     // 최대제한수량
        }

        // 당일발송가능여부가 "Y"일 경우
        if ("Y".equals(prPregGoodsBase.getTdaySndPsbYn())) {
            Validator.throwIfEmpty(prPregGoodsBase.getWdSndPsbTm()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "wdSndPsbTm"}));    // 평일발송가능시간
        }

        // 토요일발송가능여부가 "Y"일 경우
        if ("Y".equals(prPregGoodsBase.getSdaySndPsbYn())) {
            Validator.throwIfEmpty(prPregGoodsBase.getSdaySndPsbTm()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "sdaySndPsbTm"}));  // 토요일발송가능시간
        }

        // 검색가능여부가 "Y"일인 경우
        if ("Y".equals(prPregGoodsBase.getSchPsbYn())) {
            Validator.throwIfEmpty(prPregGoodsBase.getSchKwd1Nm()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "schKwd1Nm"}));     // 검색키워드1명
            Validator.throwIfEmpty(prPregGoodsBase.getSchKwd2Nm()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "schKwd2Nm"}));     // 검색키워드2명
            Validator.throwIfEmpty(prPregGoodsBase.getSchKwd3Nm()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsBase", "schKwd3Nm"}));     // 검색키워드3명
        }

        return prPregGoodsBase;
    }

    /**
     * 가등록예약판매이력 유효성 체크
     */
    private PrPregRsvSaleHist validatePrPregRsvSaleHist(PrPregRsvSaleHist prPregRsvSaleHist) throws Exception {

        Validator.throwIfEmpty(prPregRsvSaleHist.getPregGoodsNo()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "pregGoodsNo"}));        // 가등록상품번호
        Validator.throwIfEmpty(prPregRsvSaleHist.getRsvStrtDtm()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "rsvStrtDtm"}));         // 예약시작일시
        Validator.throwIfEmpty(prPregRsvSaleHist.getRsvEndDtm()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "rsvEndDtm"}));          // 예약종료일시
        Validator.throwIfEmpty(prPregRsvSaleHist.getFwdidcPrarDy()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "fwdidcPrarDy"}));       // 출고지시예정일자
        Validator.throwIfEmpty(prPregRsvSaleHist.getRsvEndAfProcMethCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "rsvEndAfProcMethCd"})); // 예약종료후판매방식
        Validator.throwIfEmpty(prPregRsvSaleHist.getSysRegId()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "sysRegId"}));           // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregRsvSaleHist.getSysModId()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregRsvSaleHist", "sysModId"}));           // 시스템 수정자 ID

        return prPregRsvSaleHist;
    }

    /**
     * 가등록상품항목정보 유효성 체크
     */
    private PrPregGoodsItemInfo validatePrPregGoodsItemInfo(PrPregGoodsItemInfo prPregGoodsItemInfo) throws Exception {

        Validator.throwIfEmpty(prPregGoodsItemInfo.getPregGoodsNo()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsItemInfo", "pregGoodsNo"}));       // 가등록상품번호
        Validator.throwIfEmpty(prPregGoodsItemInfo.getGoodsNotiItemCd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsItemInfo", "goodsNotiLisartCd"})); // 상품고시품목코드
        Validator.throwIfEmpty(prPregGoodsItemInfo.getGoodsNotiItemCd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsItemInfo", "goodsNotiItemCd"}));   // 상품고시항목코드
        Validator.throwIfEmpty(prPregGoodsItemInfo.getNotiItemCmt()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsItemInfo", "notiItemCmt"}));       // 고시항목내용
        Validator.throwIfEmpty(prPregGoodsItemInfo.getSysRegId()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsItemInfo", "sysRegId"}));          // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregGoodsItemInfo.getSysModId()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsItemInfo", "sysModId"}));          // 시스템 수정자 ID

        return prPregGoodsItemInfo;
    }

    /**
     * 가등록상품안전인증이력 유효성 체크
     */
    private PrPregGoodsSafeCertiHist validatePrPregGoodsSafeCertiHist(PrPregGoodsSafeCertiHist prPregGoodsSafeCertiHist) throws Exception {

        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getPregGoodsNo()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "pregGoodsNo"}));   // 가등록상품번호
        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getSafeCertiGbCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "safeCertiGbCd"})); // 안전인증구분코드
        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getSafeCertiNo()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "safeCertiNo"}));   // 안전인증번호
        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getAplyStrDt()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "aplyStrDt"}));     // 적용시작일자
        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getAplyEndDt()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "aplyEndDt"}));     // 적용종료일자
        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getSysRegId()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "sysRegId"}));      // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregGoodsSafeCertiHist.getSysModId()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsSafeCertiHist", "sysModId"}));      // 시스템 수정자 ID

        return prPregGoodsSafeCertiHist;
    }

    /**
     * 가등록상품가격이력 유효성 체크
     */
    private PrPregGoodsPrcHist validatePrPregGoodsPrcHist(PrPregGoodsPrcHist prPregGoodsPrcHist) throws Exception {

        Validator.throwIfEmpty(prPregGoodsPrcHist.getPregGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "pregGoodsNo"})); // 가등록상품번호
        Validator.throwIfEmpty(prPregGoodsPrcHist.getHistStrDtm()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "histStrDtm"}));  // 이력시작일시
        Validator.throwIfEmpty(prPregGoodsPrcHist.getHistEndDtm()  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "histEndDtm"}));  // 이력종료일시
        Validator.throwIfNull( prPregGoodsPrcHist.getSupPcost()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "supPcost"}));    // 공급원가
        Validator.throwIfNull( prPregGoodsPrcHist.getNorPrc()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "norPrc"}));      // 정상가
        Validator.throwIfNull( prPregGoodsPrcHist.getSalePrc()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "salePrc"}));     // 판매가
        Validator.throwIfNull( prPregGoodsPrcHist.getMrgnRate()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "mrgnRate"}));    // 마진율
        Validator.throwIfEmpty(prPregGoodsPrcHist.getSysRegId()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "sysRegId"}));    // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregGoodsPrcHist.getSysModId()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPrcHist", "sysModId"}));    // 시스템 수정자 ID

        return prPregGoodsPrcHist;
    }

    /**
     * 가등록상품결제수단정보 유효성 체크
     */
    private PrPregGoodsPayMeanInfo validatePrPregGoodsPayMeanInfo(PrPregGoodsPayMeanInfo prPregGoodsPayMeanInfo) throws Exception {

        Validator.throwIfEmpty(prPregGoodsPayMeanInfo.getPregGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPayMeanInfo", "pregGoodsNo"})); // 가등록상품번호
        Validator.throwIfEmpty(prPregGoodsPayMeanInfo.getPayWayCd()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPayMeanInfo", "payWayCd"}));    // 결제수단코드
        Validator.throwIfEmpty(prPregGoodsPayMeanInfo.getUseYn()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPayMeanInfo", "useYn"}));       // 사용여부
        Validator.throwIfEmpty(prPregGoodsPayMeanInfo.getSysRegId()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPayMeanInfo", "sysRegId"}));    // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregGoodsPayMeanInfo.getSysModId()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregGoodsPayMeanInfo", "sysModId"}));    // 시스템 수정자 ID

        return prPregGoodsPayMeanInfo;
    }

    /**
     * 가등록단품옵션정보 유효성 체크
     */
    private PrPregItmOptnInfo validatePrPregItmOptnInfo(PrPregItmOptnInfo prPregItmOptnInfo) throws Exception {

        Validator.throwIfEmpty(prPregItmOptnInfo.getPregGoodsNo()       , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "pregGoodsNo"})); // 가등록상품번호
        Validator.throwIfEmpty(prPregItmOptnInfo.getOptnCatNo()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "optnCatNo"}));   // 옵션분류번호
        Validator.throwIfEmpty(prPregItmOptnInfo.getOptnCatNm()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "optnCatNm"}));   // 옵션분류명
        Validator.throwIfEmpty(prPregItmOptnInfo.getOptnNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "optnNo"}));      // 옵션번호
        Validator.throwIfEmpty(prPregItmOptnInfo.getOptnNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "optnNm"}));      // 옵션명
        Validator.throwIfEmpty(prPregItmOptnInfo.getSysRegId()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "sysRegId"}));    // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregItmOptnInfo.getSysModId()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmOptnInfo", "sysModId"}));    // 시스템 수정자 ID

        return prPregItmOptnInfo;
    }

    /**
     * 가등록단품기본 유효성 체크
     */
    private PrPregItmBase validatePrPregItmBase(PrPregItmBase prPregItmBase) throws Exception {

        Validator.throwIfEmpty(prPregItmBase.getPregGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "pregGoodsNo"}));    // 가등록상품번호
        Validator.throwIfEmpty(prPregItmBase.getPregGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "itmNo"}));          // 단품번호
        Validator.throwIfNull( prPregItmBase.getPregGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "stkQty"}));         // 재고수량
        Validator.throwIfEmpty(prPregItmBase.getPregGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "soutNotiYn"}));     // 품절알림여부
        Validator.throwIfNull( prPregItmBase.getPregGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "soutNotiStdQty"})); // 품절알림기준수량
        Validator.throwIfEmpty(prPregItmBase.getSysRegId()               , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "sysRegId"}));       // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregItmBase.getSysModId()               , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregItmBase", "sysModId"}));       // 시스템 수정자 ID

        return prPregItmBase;
    }

    /**
     * 가등록상품홍보문구이력 유효성 체크
     */
    private PrPregAdveWrdHist validatePrPregAdveWrdHist(PrPregAdveWrdHist prPregAdveWrdHist) throws Exception {

        Validator.throwIfEmpty(prPregAdveWrdHist.getPregGoodsNo()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "pregGoodsNo"})); // 가등록상품번호
        Validator.throwIfEmpty(prPregAdveWrdHist.getAplyStrDt()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "aplyStrDt"}));   // 적용시작일자
        Validator.throwIfEmpty(prPregAdveWrdHist.getAplyEndDt()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "aplyEndDt"}));   // 적용종료일자
        Validator.throwIfEmpty(prPregAdveWrdHist.getAdveWrd()             , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "adveWrd"}));     // 홍보문구
        Validator.throwIfEmpty(prPregAdveWrdHist.getUseYn()               , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "useYn"}));       // 사용여부
        Validator.throwIfEmpty(prPregAdveWrdHist.getSysRegId()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "sysRegId"}));    // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregAdveWrdHist.getSysModId()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAdveWrdHist", "sysModId"}));    // 시스템 수정자 ID

        return prPregAdveWrdHist;
    }

    /**
     * 가등록증정품이력 유효성 체크
     */
    private PrPregPrestHist validatePrPregPrestHist(PrPregPrestHist prPregPrestHist) throws Exception {

        Validator.throwIfEmpty(prPregPrestHist.getPregGoodsNo()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "pregGoodsNo"})); // 가등록상품번호
        Validator.throwIfEmpty(prPregPrestHist.getAplyStrDt()              , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "aplyStrDt"}));   // 적용시작일자
        Validator.throwIfEmpty(prPregPrestHist.getAplyEndDt()              , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "aplyEndDt"}));   // 적용종료일자
        Validator.throwIfEmpty(prPregPrestHist.getPrestNm()                , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "prestNm"}));     // 증정품명
        Validator.throwIfEmpty(prPregPrestHist.getUseYn()                  , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "useYn"}));       // 사용여부
        Validator.throwIfEmpty(prPregPrestHist.getSysRegId()               , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "sysRegId"}));    // 시스템 등록자 ID
        Validator.throwIfEmpty(prPregPrestHist.getSysModId()               , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregPrestHist", "sysModId"}));    // 시스템 수정자 ID

        return prPregPrestHist;
    }

    /**
     * 표준카테고리전시정보 유효성 체크
     */
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

    /**
     * 가등록연계상품정보 유효성 체크
     */
    private PrPregAssocGoodsInfo validatePrPregAssocGoodsInfo(PrPregAssocGoodsInfo prPregAssocGoodsInfo, String type) throws Exception {

        switch (type) {
            case INSERT_TYPE:
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getAsctGbCd()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "asctGbCd"}));       // 연관구분코드
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getSysRegId()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "sysRegId"}));       // 시스템 등록자 ID
            case UPDATE_TYPE:
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getPregGoodsNo(), MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "pregGoodsNo"}));    // 가등록상품번호
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getAsctGoodsNo(), MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "asctGoodsNo"}));    // 연관상품번호
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getSortSeq()    , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "sortSeq"}));        // 정렬순서
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getSysModId()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "sysModId"}));       // 시스템 수정자 ID
                break;
            case DELETE_TYPE:
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getPregGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "pregGoodsNo"}));   // 가등록상품번호
                Validator.throwIfEmpty(prPregAssocGoodsInfo.getAsctGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"PrPregAssocGoodsInfo", "asctGoodsNo"}));   // 연관상품번호
                break;
        }
        return prPregAssocGoodsInfo;
    }
}
