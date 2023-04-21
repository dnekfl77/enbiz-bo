package com.enbiz.bo.app.service.goods;

import com.enbiz.bo.app.dto.request.goods.PackageTargetGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.TemporaryPackageGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.PackageTargetGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryPackageGoodsResponse;
import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregRelGoodsInfo;
import com.enbiz.bo.app.enums.*;
import com.enbiz.bo.app.repository.goods.*;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * 임시 묶음상품 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class TemporaryPackageGoodsServiceImpl implements TemporaryPackageGoodsService {

    private static final String EMPTY_ERROR_MSG = "packageGoods.err.msg.noSaveRequiredValueError";
    private static final String NULL_ERROR_MSG = "packageGoods.err.msg.isNullError";

    private static final String INSERT_TYPE = "I";
    private static final String UPDATE_TYPE = "U";
    private static final String DELETE_TYPE = "D";

    /* 상품기본 */
    private final PrPregGoodsBaseMapper prPregGoodsBaseMapper;
    private final PrPregGoodsBaseTrxMapper prPregGoodsBaseTrxMapper;
    private final PrGoodsBaseMapper prGoodsBaseMapper;

    /* 관계상품정보 */
    private final PrPregRelGoodsInfoMapper prPregRelGoodsInfoMapper;
    private final PrPregRelGoodsInfoTrxMapper prPregRelGoodsInfoTrxMapper;

    @Override
    public TemporaryPackageGoodsResponse getTemporaryPackageGoodsInfo(String pregGoodsNo) throws Exception {

        TemporaryPackageGoodsResponse response = prPregGoodsBaseMapper.getTemporaryPackageGoodsInfo(pregGoodsNo);
        response.setPrPregRelGoodsInfoList(prPregRelGoodsInfoMapper.getPregRelGoodsInfoList(pregGoodsNo));
        return response;
    }

    @Override
    public int getPackageTargetGoodsListCount(PackageTargetGoodsRequest request) throws Exception {
        return prGoodsBaseMapper.getPackageTargetGoodsListCount(request);
    }

    @Override
    public List<PackageTargetGoodsResponse> getPackageTargetGoodsList(PackageTargetGoodsRequest request) throws Exception {
        return prGoodsBaseMapper.getPackageTargetGoodsList(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void temporaryPackageGoodsRegist(RawRealGridCUDRequest rawCUDRequest, TemporaryPackageGoodsRequest request) throws Exception {

        PrPregGoodsBase prPregGoodsBase = setInsertData(request);
        prPregGoodsBaseTrxMapper.insertPregGoods(validatePkgGoodsInfo(prPregGoodsBase, INSERT_TYPE));
        insertPkgGoodsGridData(rawCUDRequest, prPregGoodsBase);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void temporaryPackageGoodsUpdate(RawRealGridCUDRequest rawCUDRequest, TemporaryPackageGoodsRequest request) throws Exception {

        // 승인상태가 반려인 경우 > 임시저장으로 상태 변경, 반려 정보 초기화
        if (PR024.RETURN.isEquals(request.getPregStatCd())) {
            request.setPregStatCd(PR024.SAVED.getCd());
            request.setRetnCaus(null);
            request.setRetnCausCd(null);
            request.setRetnDt(null);
        }

        prPregGoodsBaseTrxMapper.updatePkgPregGoodsInfo(validatePkgGoodsInfo(request, UPDATE_TYPE));
        insertPkgGoodsGridData(rawCUDRequest, request);
    }

    private PrPregGoodsBase validatePkgGoodsInfo(PrPregGoodsBase prPregGoodsBase, String type) throws Exception {

        if (INSERT_TYPE.equals(type)) {
            Validator.throwIfEmpty(prPregGoodsBase.getEntrNo()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "entrNo"}));            // 협력사번호
            Validator.throwIfEmpty(prPregGoodsBase.getSysRegId()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "sysRegId"}));          // 시스템 등록자 ID
        } else if (UPDATE_TYPE.equals(type)) {
            Validator.throwIfEmpty(prPregGoodsBase.getPregGoodsNo()   , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "pregGoodsNo"}));       // 가등록상품번호
            Validator.throwIfEmpty(prPregGoodsBase.getSysModId()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "sysModId"}));          // 시스템 수정자 ID
        }

        Validator.throwIfEmpty(prPregGoodsBase.getGoodsNm()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "goodsNm"}));           // 상품명
        Validator.throwIfEmpty(prPregGoodsBase.getStdCtgNo()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "stdCtgNo"}));          // 표준분류카테고리번호
        Validator.throwIfEmpty(prPregGoodsBase.getPregStatCd()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "pregStatCd"}));        // 가등록상태코드
        Validator.throwIfEmpty(prPregGoodsBase.getBrandNo()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "brandNo"}));           // 브랜드번호
        Validator.throwIfEmpty(prPregGoodsBase.getModlNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "modlnm"}));            // 모델명
        Validator.throwIfEmpty(prPregGoodsBase.getHomeNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "homeNm"}));            // 원산지명
        Validator.throwIfEmpty(prPregGoodsBase.getMfcoNm()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "mfcoNm"}));            // 제조사명
        Validator.throwIfEmpty(prPregGoodsBase.getSalemnNm()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "salemnNm"}));          // 판매자명
        Validator.throwIfEmpty(prPregGoodsBase.getDispYn()            , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "dispYn"}));            // 전시여부
        Validator.throwIfEmpty(prPregGoodsBase.getSaleStrDtm()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "saleStrDtm"}));        // 판매시작일시
        Validator.throwIfEmpty(prPregGoodsBase.getSaleEndDtm()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "saleEndDtm"}));        // 판매종료일시
        Validator.throwIfEmpty(prPregGoodsBase.getPrcCompaExpYn()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "prcCompaExpYn"}));     // 가격비교노출여부
        Validator.throwIfEmpty(prPregGoodsBase.getSchPsbYn()          , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "schPsbYn"}));          // 검색가능여부
        Validator.throwIfEmpty(prPregGoodsBase.getPkgGoodsPrioRnkCd() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "pkgGoodsPrioRnkCd"})); // 묶음상품우선순위코드

        if ("Y".equals(prPregGoodsBase.getSchPsbYn())) {
            Validator.throwIfEmpty(prPregGoodsBase.getSchKwd1Nm()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "schKwd1Nm"}));         // 검색키워드1명
            Validator.throwIfEmpty(prPregGoodsBase.getSchKwd2Nm()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "schKwd2Nm"}));         // 검색키워드2명
            Validator.throwIfEmpty(prPregGoodsBase.getSchKwd3Nm()     , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[]{"prPregGoodsBase", "schKwd3Nm"}));         // 검색키워드3명
        }

        return prPregGoodsBase;
    }

    private PrPregGoodsBase setInsertData(TemporaryPackageGoodsRequest request) throws Exception {

        PrPregGoodsBase prPregGoodsBase = new PrPregGoodsBase();
        BeanUtils.copyProperties(prPregGoodsBase, request);

        prPregGoodsBase.setRegInfPathCd(PR029.BO_SYSTEM.getCd());    // 등록유입경로
        prPregGoodsBase.setGoodsCompCd(PR001.PKG_GOODS.getCd());     // 상품구성코드
        prPregGoodsBase.setGoodsTypCd(PR002.GEN_GOODS.getCd());      // 상품유형코드
        prPregGoodsBase.setSaleMethCd(PR003.NORMAL_SALE.getCd());    // 판매방식코드
        prPregGoodsBase.setDeliGoodsGbCd(PR010.GEN_GOODS.getCd());   // 배송상품구분코드
        prPregGoodsBase.setDeliWayCd(PR009.HD_DLV.getCd());          // 배송수단코드

        prPregGoodsBase.setBuyTypCd(PR006.CNSG_PUR.getCd());         // 매입형태코드
        prPregGoodsBase.setDeliProcTypCd(PR008.CORP_DLV.getCd());    // 배송처리유형코드
        prPregGoodsBase.setSafeCertiTgtYn("N");                      // 안전인증대상여부
        prPregGoodsBase.setBuyQtyLmtYn("N");                         // 구매수량제한여부
        prPregGoodsBase.setMinLmtQty(0);                             // 최소제한수량
        prPregGoodsBase.setMaxLmtQty(0);                             // 최대제한수량
        prPregGoodsBase.setTdaySndPsbYn("N");                        // 당일발송가능여부
        prPregGoodsBase.setSdaySndPsbYn("N");                        // 툐요일발송가능여부
        prPregGoodsBase.setBdlDeliPsbYn("Y");                        // 묶음배송가능여부
        prPregGoodsBase.setBdlRtnPsbYn("Y");                         // 묶음반품가능여부
        prPregGoodsBase.setRtnPsbYn("Y");                            // 반품가능여부
        prPregGoodsBase.setExchPsbYn("Y");                           // 교환가능여부
        prPregGoodsBase.setStkMgrYn("N");                            // 재고관리여부
        prPregGoodsBase.setItmSoutNotiYn("N");                       // 단품품절알림여부
        prPregGoodsBase.setBuyrAgeLmtCd(PR004.ZERO.getCd());         // 구입자나이제한코드
        prPregGoodsBase.setTaxGbCd(PR007.TAX.getCd());               // 과면세구분코드
        prPregGoodsBase.setDeliDday(3);                              // 배송기일
        prPregGoodsBase.setDeliPolcNo("0");                          // 배송정책번호

        prPregGoodsBase.setShrtGoodsNm(prPregGoodsBase.getGoodsNm()); // 단축상품명

        return prPregGoodsBase;
    }

    private void insertPkgGoodsGridData(RawRealGridCUDRequest rawCUDRequest, PrPregGoodsBase prPregGoodsBase) throws Exception {

        // 관계상품정보 저장
        RealGridCUDRequest<PrPregRelGoodsInfo> packageRelatedGoodsListGridCUD
                = rawCUDRequest.getRequest("packageRelatedGoodsListGrid", PrPregRelGoodsInfo.class);
        List<PrPregRelGoodsInfo> createdPrPregRelGoodsInfoList = packageRelatedGoodsListGridCUD.getCreate();
        List<PrPregRelGoodsInfo> updatedPrPregRelGoodsInfoList = packageRelatedGoodsListGridCUD.getUpdate();
        List<PrPregRelGoodsInfo> deletedPrPregRelGoodsInfoList = packageRelatedGoodsListGridCUD.getDelete();

        for (PrPregRelGoodsInfo prPregRelGoodsInfo : createdPrPregRelGoodsInfoList) {
            BeanUtils.copyProperties(prPregRelGoodsInfo, prPregGoodsBase);
            prPregRelGoodsInfo.setPregBaseGoodsNo(prPregGoodsBase.getPregGoodsNo());
            prPregRelGoodsInfoTrxMapper.insertPrPregRelGoods(validatePrPregRelGoodsInfo(prPregRelGoodsInfo, INSERT_TYPE));
        }

        for (PrPregRelGoodsInfo prPregRelGoodsInfo : updatedPrPregRelGoodsInfoList) {
            BeanUtils.copyProperties(prPregRelGoodsInfo, prPregGoodsBase);
            prPregRelGoodsInfo.setPregBaseGoodsNo(prPregGoodsBase.getPregGoodsNo());
            prPregRelGoodsInfoTrxMapper.updatePrPregRelGoodsInfo(validatePrPregRelGoodsInfo(prPregRelGoodsInfo, UPDATE_TYPE));
        }

        for (PrPregRelGoodsInfo prPregRelGoodsInfo : deletedPrPregRelGoodsInfoList) {
            prPregRelGoodsInfo.setPregBaseGoodsNo(prPregGoodsBase.getPregGoodsNo());
            prPregRelGoodsInfoTrxMapper.deletePrPregRelGoods(validatePrPregRelGoodsInfo(prPregRelGoodsInfo, DELETE_TYPE));
        }
    }

    private PrPregRelGoodsInfo validatePrPregRelGoodsInfo(PrPregRelGoodsInfo prPregRelGoodsInfo, String type) throws Exception {

        switch (type){
            case INSERT_TYPE:
                Validator.throwIfEmpty( prPregRelGoodsInfo.getSysRegId()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","sysRegId"         })); // 시스템 등록자 ID
            case UPDATE_TYPE:
                Validator.throwIfEmpty( prPregRelGoodsInfo.getPregBaseGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","pregBaseGoodsNo"  })); // 가등록기준상품번호
                Validator.throwIfEmpty( prPregRelGoodsInfo.getTgtGoodsNo()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","tgtGoodsNo"       })); // 대상상품번호
                Validator.throwIfEmpty( prPregRelGoodsInfo.getRepYn()           , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","repYn"            })); // 대표여부
                Validator.throwIfEmpty( prPregRelGoodsInfo.getSortSeq()         , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","sortSeq"          })); // 정렬순서
                Validator.throwIfEmpty( prPregRelGoodsInfo.getSysModId()        , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","sysModId"         })); // 시스템 수정자 ID
                break;
            case DELETE_TYPE:
                Validator.throwIfEmpty( prPregRelGoodsInfo.getPregBaseGoodsNo() , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","pregBaseGoodsNo"  })); // 가등록기준상품번호
                Validator.throwIfEmpty( prPregRelGoodsInfo.getTgtGoodsNo()      , MessageResolver.getMessage(EMPTY_ERROR_MSG, new String[] {"PrPregRelGoodsInfo","tgtGoodsNo"       })); // 대상상품번호
                break;
        }

        return prPregRelGoodsInfo;
    }
}
