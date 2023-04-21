package com.enbiz.bo.app.service.marketing;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.marketing.CouponIssuedMemberRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponMgmtCudRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponAplyInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponAplyMediaResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponExcelMbrResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponIssuedMemberResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponUseWdayInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.entity.CcCpnIsuMbr;
import com.enbiz.bo.app.entity.CcPromBase;
import com.enbiz.bo.app.entity.CcPromoAplyInfo;
import com.enbiz.bo.app.entity.CcPromoAplyMediaInfo;
import com.enbiz.bo.app.entity.CcPromoUseWdayInfo;
import com.enbiz.bo.app.enums.MK002;
import com.enbiz.bo.app.enums.MK007;
import com.enbiz.bo.app.enums.MK013;
import com.enbiz.bo.app.enums.MK014;
import com.enbiz.bo.app.enums.MK015;
import com.enbiz.bo.app.repository.marketing.CcPromBaseMapper;
import com.enbiz.bo.app.repository.marketing.CcPromBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import com.enbiz.common.base.util.DateTimeUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 쿠폰 관리 서비스 Impl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class CouponMgmtServiceImpl implements CouponMgmtService{

    private final CcPromBaseMapper ccPromBaseMapper;
    private final CcPromBaseTrxMapper ccPromBaseTrxMapper;

    @Override
    public List<CouponResponse> getCouponList(CouponRequest request) throws Exception {
        return ccPromBaseMapper.getCouponManagingList(request);
    }

    @Override
    public int getCouponListCount(CouponRequest request) throws Exception {
        return ccPromBaseMapper.getCouponManagingListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCoupon(CouponMgmtCudRequest request) throws Exception {
        validation(request);

        CcPromBase ccPromBase = new CcPromBase();
        BeanUtils.copyProperties(ccPromBase, request);

        //발급횟수제한 , Y : 발급제한여부 , N : 무제한
        if(ccPromBase.getIssuLmtYn().equals("N")){
            ccPromBase.setIssuQty(0);
        }

        //발급방식 ( 01 : 대상자지정발급 , 02 : 조건부자동발급, 03 : 고객다운로드 발급 )
        if(MK007.TARGET_DESIGN.isEquals(ccPromBase.getIssuMethCd())) {
            ccPromBase.setAutoIssuTypCd(null);
            ccPromBase.setAutoIssuPotmCd(null);
            ccPromBase.setAnvyBeIssuDaynub(null);
        }else if(MK007.CONDITION_AUTO.isEquals(ccPromBase.getIssuMethCd())){
            ccPromBase.setCpbookDispYn(null);
            ccPromBase.setDcCpbookCd(null);
        }else{
            ccPromBase.setAutoIssuTypCd(null);
            ccPromBase.setAutoIssuPotmCd(null);
            ccPromBase.setAnvyBeIssuDaynub(null);
        }

        // 적용기간구분코드 ( 01 : 기간기준 , 02 : 발급일 기준 )
        if(MK015.PERIOD_STANDARD.isEquals(ccPromBase.getAplyTermGbCd())){
            ccPromBase.setIssuDdStdCpnUseDds(null);
        }else{
            ccPromBase.setUsePsbStrDt(null);
            ccPromBase.setUsePsbEndDt(null);
        }

        if(ccPromBase.getTmCpnYn().equals("N")){
            ccPromBase.setUsePsbStrTm(null);
            ccPromBase.setUsePsbEndTm(null);
        }

        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ccPromBase.setSysRegId(currentUser.getLoginId());
        ccPromBase.setSysModId(currentUser.getLoginId());

        //프로모션 기본
        if(StringUtils.isBlank(ccPromBase.getPromoNo())){
            ccPromBaseTrxMapper.insertCoupon(ccPromBase);
        } else{
            ccPromBaseTrxMapper.updateCoupon(ccPromBase);
        }

        //프로모션 적용매체 정보
        CcPromoAplyMediaInfo deleteAplyMediaInfo = new CcPromoAplyMediaInfo();
        deleteAplyMediaInfo.setPromoNo(ccPromBase.getPromoNo());
        ccPromBaseTrxMapper.deletePromotionMedia(deleteAplyMediaInfo);
        if(request.getAplyPsbMediaCd() != null && request.getAplyPsbMediaCd().size() > 0){
            for(String mediaCd : request.getAplyPsbMediaCd()) {
                CcPromoAplyMediaInfo ccPromoAplyMediaInfo = new CcPromoAplyMediaInfo();
                ccPromoAplyMediaInfo.setPromoNo(ccPromBase.getPromoNo());
                ccPromoAplyMediaInfo.setAplyPsbMediaCd(mediaCd);
                ccPromoAplyMediaInfo.setSysRegId(ccPromBase.getSysRegId());
                ccPromoAplyMediaInfo.setSysModId(ccPromBase.getSysModId());
                ccPromBaseTrxMapper.insertPromotionMedia(ccPromoAplyMediaInfo);
            }
        }

        //프로모션 사용요일 정보
        CcPromoUseWdayInfo deleteUseWdayInfo = new CcPromoUseWdayInfo();
        deleteUseWdayInfo.setPromoNo(ccPromBase.getPromoNo());
        ccPromBaseTrxMapper.deletePromotionWdays(deleteUseWdayInfo);

        if(request.getUseWdayCd() != null  && request.getUseWdayCd().size() > 0){
            for(String dayCd : request.getUseWdayCd()){
                CcPromoUseWdayInfo ccPromoUseWdayInfo = new CcPromoUseWdayInfo();
                ccPromoUseWdayInfo.setPromoNo(ccPromBase.getPromoNo());
                ccPromoUseWdayInfo.setUseWdayCd(dayCd);
                ccPromoUseWdayInfo.setSysRegId(ccPromBase.getSysRegId());
                ccPromoUseWdayInfo.setSysModId(ccPromBase.getSysModId());
                ccPromBaseTrxMapper.insertPromotionWdays(ccPromoUseWdayInfo);
            }
        }

        //프로모션 적용 정보 - 적용
        CcPromoAplyInfo delPromoAplyInfo = new CcPromoAplyInfo();
        delPromoAplyInfo.setPromoNo(ccPromBase.getPromoNo());
        ccPromBaseTrxMapper.deletePromotionAplyInfo(delPromoAplyInfo);

        String applyCd = MK013.APPLY.getCd();
        String limitCd = MK013.LIMIT.getCd();
        insertCouponAplyInfo(request.getAplySites(),ccPromBase, applyCd, MK014.SITE.getCd());
        insertCouponAplyInfo(request.getAplyGoods(),ccPromBase,applyCd, MK014.GOODS.getCd());
        insertCouponAplyInfo(request.getAplyCategory(),ccPromBase,applyCd, MK014.CATEGORY.getCd());
        insertCouponAplyInfo(request.getAplyStdGoods(),ccPromBase,applyCd, MK014.STD_GOODS.getCd());
        insertCouponAplyInfo(request.getAplyEntr(),ccPromBase,applyCd, MK014.ENTR.getCd());
        insertCouponAplyInfo(request.getAplyBrand(),ccPromBase,applyCd, MK014.BRAND.getCd());
        insertCouponAplyInfo(request.getAplyChannel(),ccPromBase,applyCd, MK014.CHANNEL.getCd());

        //프로모션 적용 정보 - 제한
        insertCouponAplyInfo(request.getExceptGoods(),ccPromBase,limitCd, MK014.GOODS.getCd());
        insertCouponAplyInfo(request.getExceptStdGoods(),ccPromBase,limitCd, MK014.STD_GOODS.getCd());

    }


    /**
     * 쿠폰 상세 정보 가져오기
     * @param promoNo
     * @return
     * @throws Exception
     */
    @Override
    public PromotionDetailResponse getCouponData(String promoNo) throws Exception {

        //프로모션 기본 데이터 가져온다
        PromotionDetailResponse couponData = ccPromBaseMapper.getPromotionData(promoNo);

        //프로모션 적용정보
        // 01 : 사이트 , 02 : 상품 ,  03 : 전시카테고리  , 04 : 표준상품분류 , 05 : 협력사 , 06 : 브랜드 , 07 : 채널
        List<CouponAplyInfoResponse> couponAplyInfo = ccPromBaseMapper.getPromotionAplyInfo(promoNo);
        if(couponAplyInfo != null && couponAplyInfo.size() > 0){
            for(CouponAplyInfoResponse cpAplyRespon : couponAplyInfo){
                Map<String, String> data = getMapAplyInfo(cpAplyRespon);
                if(cpAplyRespon.getFvrAplyGbCd().equals("01")){
                    if(MK014.SITE.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplySites().add(data);
                    }else if(MK014.GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplyGoods().add(data);
                    }else if(MK014.CATEGORY.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplyCategory().add(data);
                    }else if(MK014.STD_GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplyStdGoods().add(data);
                    }else if(MK014.ENTR.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplyEntr().add(data);
                    }else if(MK014.BRAND.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplyBrand().add(data);
                    }else if(MK014.CHANNEL.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getAplyChannel().add(data);
                    }
                }else{
                    if(MK014.GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getExceptGoods().add(data);
                    }else if(MK014.STD_GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        couponData.getExceptStdGoods().add(data);
                    }
                }
            }
        }

        //프로모션 사용요일 정도
        List<CouponUseWdayInfoResponse> couponWdayInfo = ccPromBaseMapper.getPromotionWdayInfo(promoNo);
        if(couponWdayInfo != null && couponWdayInfo.size() > 0){
            for(CouponUseWdayInfoResponse couponUseWdayInfoResponse : couponWdayInfo){
                couponData.getUseWdayCd().add(couponUseWdayInfoResponse.getUseWdayCd());
            }
        }

        //프로모션 적용매체
        List<CouponAplyMediaResponse> couponMediaInfo = ccPromBaseMapper.getPromotionMediaInfo(promoNo);
        if(couponMediaInfo != null && couponMediaInfo.size() > 0){
            for(CouponAplyMediaResponse couponAplyMediaResponse : couponMediaInfo){
                couponData.getAplyPsbMediaCd().add(couponAplyMediaResponse.getAplyPsbMediaCd());
            }
        }

        return couponData;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteCoupon(String promoNo) throws Exception {

        CcPromBase ccPromBase = new CcPromBase();
        CcPromoAplyInfo ccPromoAplyInfo = new CcPromoAplyInfo();
        CcPromoAplyMediaInfo ccPromoAplyMediaInfo = new CcPromoAplyMediaInfo();
        CcPromoUseWdayInfo ccPromoUseWdayInfo = new CcPromoUseWdayInfo();

        ccPromBase.setPromoNo(promoNo);
        ccPromoAplyInfo.setPromoNo(promoNo);
        ccPromoAplyMediaInfo.setPromoNo(promoNo);
        ccPromoUseWdayInfo.setPromoNo(promoNo);

        ccPromBaseTrxMapper.deletePromotion(ccPromBase);
        ccPromBaseTrxMapper.deletePromotionAplyInfo(ccPromoAplyInfo);
        ccPromBaseTrxMapper.deletePromotionMedia(ccPromoAplyMediaInfo);
        ccPromBaseTrxMapper.deletePromotionWdays(ccPromoUseWdayInfo);

    }

    @Override
    public List<CouponIssuedMemberResponse> getCouponIssuedMemberList(CouponIssuedMemberRequest request) throws Exception {
        return ccPromBaseMapper.getCouponIssuedMbrList(request);
    }

    @Override
    public int getCouponIssuedMemberListCount(CouponIssuedMemberRequest request) throws Exception {
        return ccPromBaseMapper.getCouponIssuedMbrListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCouponIssuedMember(List<CcCpnIsuMbr> insert) throws Exception {
        for (CcCpnIsuMbr ccCpnIsuMbr : insert) {
            ccPromBaseTrxMapper.registCouponIssuedMbr(ccCpnIsuMbr);
        }
    }

    @Override
    public List<CouponIssuedMemberResponse> getExcelData(String promoNo, List<CouponIssuedMemberResponse> list) throws Exception {

        String[] params = new String[list.size()];
        for(int i=0;i<list.size();i++){
            params[i] = list.get(i).getLoginId();
        }

        //회원정보 조회
        List<CouponExcelMbrResponse> mbrList = ccPromBaseMapper.getMbrList(params);
        PromotionDetailResponse couponData = ccPromBaseMapper.getPromotionData(promoNo);

        for(CouponIssuedMemberResponse response : list){
            for(CouponExcelMbrResponse mbr : mbrList){
                if(!response.getLoginId().equals(mbr.getLoginId())){
                    continue;
                }
                response.setMbrNo(mbr.getMbrNo());
                response.setMbrNm(mbr.getMbrNm());
                response.setMbrGradeCd(mbr.getMbrGradeCd());
                response.setMbrGradeNm(mbr.getMbrGradeNm());
                response.setCpnNo(couponData.getPromoNo());
                
                // 적용기간구분코드 ( 01 : 기간기준 , 02 : 발급일 기준 )
                if(MK015.PERIOD_STANDARD.isEquals(couponData.getAplyTermGbCd())) {
                    response.setValiStrtDtm(couponData.getUsePsbStrDt());
                    response.setValiEndDtm(couponData.getUsePsbEndDt());
                }else{
                    response.setValiStrtDtm(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
                    response.setValiEndDtm(ChronoUnit.DAYS.addTo(LocalDate.now(), couponData.getIssuDdStdCpnUseDds()).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
                }
                break;
            }
        }

        return list;
    }

    public Map<String,String> getMapAplyInfo(CouponAplyInfoResponse couponAplyInfoResponse){
        Map<String,String> data = new TreeMap<>();
        data.put("key",couponAplyInfoResponse.getFvrTgtNo());
        data.put("data",couponAplyInfoResponse.getFvrTgtNm()==null?"":couponAplyInfoResponse.getFvrTgtNm());
        return data;
    }

    public void insertCouponAplyInfo(List<String> aplyList,CcPromBase ccPromBase,String aplyGbCd,String aplyTypCd){
        if(aplyList !=null && aplyList.size() > 0){
            List<String> distinctAplyInfo = aplyList.stream().distinct().collect(Collectors.toList());
            for(String aplyTarget : distinctAplyInfo){
                CcPromoAplyInfo ccPromoAplyInfo = getCcPromoAplyInfo(ccPromBase,aplyTarget,aplyGbCd,aplyTypCd);
                ccPromBaseTrxMapper.insertPromotionAplyInfo(ccPromoAplyInfo);
            }
        }
    }

    public CcPromoAplyInfo getCcPromoAplyInfo(CcPromBase ccPromBase,String targetNo,String aplyGbCd,String aplyTypCd){
        CcPromoAplyInfo ccPromoAplyInfo = new CcPromoAplyInfo();
        ccPromoAplyInfo.setPromoNo(ccPromBase.getPromoNo());
        ccPromoAplyInfo.setFvrAplyGbCd(aplyGbCd);
        ccPromoAplyInfo.setFvrAplyTypCd(aplyTypCd);
        ccPromoAplyInfo.setFvrTgtNo(targetNo);
        ccPromoAplyInfo.setSysRegId(ccPromBase.getSysRegId());
        ccPromoAplyInfo.setSysModId(ccPromBase.getSysModId());
        return ccPromoAplyInfo;
    }

    public void validation(CouponMgmtCudRequest request) throws Exception {

        //쿠폰명
        Validator.throwIfEmpty(request.getPromoNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoNm"}));
        //쿠폰유형
        Validator.throwIfEmpty(request.getPromoTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoTypCd"}));

        //쿠폰상태
        Validator.throwIfEmpty(request.getPromoStatCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoStatCd"}));

        //전시 시작 일시 && 종료 일시
        Validator.throwIfEmpty(request.getPromoStrDtm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoStrDtm"}));
        Validator.throwIfEmpty(request.getPromoEndDtm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoEndDtm"}));

        //쿠폰설명
        Validator.throwIfEmpty(request.getPromoDesc(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoDesc"}));

        //발급주체
        Validator.throwIfEmpty(request.getIssuSubCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"IssuSubCd"}));

        //발급횟수제한
        Validator.throwIfEmpty(request.getIssuLmtYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"IssuLmtYn"}));

		//적용매체
        Validator.throwIfEmpty(request.getAplyPsbMediaCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AplyPsbMediaCd"}));
		
		//회원등급
        Validator.throwIfEmpty(request.getMbrGradeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrGradeCd"}));
		
		//발급방식
        Validator.throwIfEmpty(request.getIssuMethCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"IssuMethCd"}));
		
		//조건부자동발급
		if(MK007.CONDITION_AUTO.isEquals(request.getIssuMethCd())){
			
			Validator.throwIfEmpty(request.getAutoIssuTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AutoIssuTypCd"}));
			Validator.throwIfEmpty(request.getAutoIssuPotmCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AutoIssuPotmCd"}));
			Validator.throwIfEmpty(request.getAnvyBeIssuDaynub(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AnvyBeIssuDaynub"}));
			
		    request.setCpbookDispYn(null);
		    request.setDcCpbookCd(null);
		}else if(MK007.CUSTOMER_DOWN.isEquals(request.getIssuMethCd())){ //고객다운로드 발급
			Validator.throwIfEmpty(request.getCpbookDispYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CpbookDispYn"}));
			Validator.throwIfEmpty(request.getDcCpbookCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"DcCpbookCd"}));
		}
		
		//유효기간구분
		Validator.throwIfEmpty(request.getAplyTermGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AplyTermGbCd"}));
		
		// 적용기간구분코드 ( 01 : 기간기준 , 02 : 발급일 기준 )
		if(MK015.PERIOD_STANDARD.isEquals(request.getAplyTermGbCd())){
			Validator.throwIfEmpty(request.getUsePsbStrDt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UsePsbStrDt"}));
			Validator.throwIfEmpty(request.getUsePsbEndDt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UsePsbEndDt"}));
		}else if(MK015.ISSUED_STANDARD.isEquals(request.getAplyTermGbCd())){
			Validator.throwIfEmpty(request.getIssuDdStdCpnUseDds(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"IssuDdStdCpnUseDds"}));
		}
		
		//사용요일
		Validator.throwIfEmpty(request.getUseWdayCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UseWdayCd"}));
		
		//타임쿠폰여부
		Validator.throwIfEmpty(request.getTmCpnYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"TmCpnYn"}));
		
		//타임쿠폰
		if(request.getTmCpnYn().equals("Y")){
			Validator.throwIfEmpty(request.getUsePsbStrTm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UsePsbStrTm"}));
			Validator.throwIfEmpty(request.getUsePsbEndTm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UsePsbEndTm"}));
		}
		
		//할인유형
		Validator.throwIfEmpty(request.getFixamtFxrtGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"FixamtFxrtGbCd"}));
		
		//할인율 , 최수 , 최대 할인금액은 변동성이 있으니 확정되면 validation 추가
		
		
		//적용대상
		String promoTypcd = request.getPromoTypCd();
		if(!(MK002.FREE_DELIVERY.isEquals(promoTypcd) || MK002.FREE_RETURN.isEquals(promoTypcd))){
		    if(CollectionUtils.isEmpty(request.getAplySites())
		     && CollectionUtils.isEmpty(request.getAplyGoods())
		     && CollectionUtils.isEmpty(request.getAplyStdGoods())
		     && CollectionUtils.isEmpty(request.getAplyCategory())
		     && CollectionUtils.isEmpty(request.getAplyBrand())
		     && CollectionUtils.isEmpty(request.getAplyEntr())
		     && CollectionUtils.isEmpty(request.getAplyChannel())){
		       throw new ValidationException(MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AplySites"}));
		    }
		}

    }
}
