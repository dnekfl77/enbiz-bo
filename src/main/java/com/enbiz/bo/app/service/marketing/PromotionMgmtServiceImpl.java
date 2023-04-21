package com.enbiz.bo.app.service.marketing;

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
import com.enbiz.bo.app.dto.request.marketing.PromotionCudRequest;
import com.enbiz.bo.app.dto.request.marketing.PromotionRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponAplyInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponAplyMediaResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponUseWdayInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionResponse;
import com.enbiz.bo.app.entity.CcPromBase;
import com.enbiz.bo.app.entity.CcPromoAplyInfo;
import com.enbiz.bo.app.entity.CcPromoAplyMediaInfo;
import com.enbiz.bo.app.entity.CcPromoUseWdayInfo;
import com.enbiz.bo.app.enums.MK002;
import com.enbiz.bo.app.enums.MK013;
import com.enbiz.bo.app.enums.MK014;
import com.enbiz.bo.app.repository.marketing.CcPromBaseMapper;
import com.enbiz.bo.app.repository.marketing.CcPromBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 프로모션 관리 서비스 Impl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class PromotionMgmtServiceImpl implements PromotionMgmtService{

    private final CcPromBaseMapper ccPromBaseMapper;
    private final CcPromBaseTrxMapper ccPromBaseTrxMapper;

    @Override
    public List<PromotionResponse> getPromotionList(PromotionRequest request) throws Exception {
        return ccPromBaseMapper.getPromotionManagingList(request);
    }

    @Override
    public int getPromotionListCount(PromotionRequest request) throws Exception {
        return ccPromBaseMapper.getPromotionManagingListCount(request);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void savePromotion(PromotionCudRequest request) throws Exception {
        validation(request);

        CcPromBase ccPromBase = new CcPromBase();
        BeanUtils.copyProperties(ccPromBase,request);
        
        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        ccPromBase.setSysRegId(currentUser.getLoginId());
        ccPromBase.setSysModId(currentUser.getLoginId());

        //프로모션 기본
        if(StringUtils.isBlank(ccPromBase.getPromoNo())){
            ccPromBaseTrxMapper.insertPromotion(ccPromBase);
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

        //프로모션 적용 정보 - 적용

        CcPromoAplyInfo delPromoAplyInfo = new CcPromoAplyInfo();
        delPromoAplyInfo.setPromoNo(ccPromBase.getPromoNo());
        ccPromBaseTrxMapper.deletePromotionAplyInfo(delPromoAplyInfo);

        String applyCd = MK013.APPLY.getCd();
        String limitCd = MK013.LIMIT.getCd();
        insertPromotionAplyInfo(request.getAplySites(),ccPromBase, applyCd, MK014.SITE.getCd());
        insertPromotionAplyInfo(request.getAplyGoods(),ccPromBase,applyCd, MK014.GOODS.getCd());
        insertPromotionAplyInfo(request.getAplyCategory(),ccPromBase,applyCd, MK014.CATEGORY.getCd());
        insertPromotionAplyInfo(request.getAplyStdGoods(),ccPromBase,applyCd, MK014.STD_GOODS.getCd());
        insertPromotionAplyInfo(request.getAplyEntr(),ccPromBase,applyCd, MK014.ENTR.getCd());
        insertPromotionAplyInfo(request.getAplyBrand(),ccPromBase,applyCd, MK014.BRAND.getCd());
        insertPromotionAplyInfo(request.getAplyChannel(),ccPromBase,applyCd, MK014.CHANNEL.getCd());

        //프로모션 적용 정보 - 제한
        insertPromotionAplyInfo(request.getExceptGoods(),ccPromBase,limitCd, MK014.GOODS.getCd());
        insertPromotionAplyInfo(request.getExceptStdGoods(),ccPromBase,limitCd, MK014.STD_GOODS.getCd());
    }

    @Override
    public PromotionDetailResponse getPromotion(String promoNo) throws Exception {
        //프로모션 기본 데이터 가져온다
        PromotionDetailResponse promotionData = ccPromBaseMapper.getPromotionData(promoNo);

        //프로모션 적용정보
        // 01 : 사이트 , 02 : 상품 ,  03 : 전시카테고리  , 04 : 표준상품분류 , 05 : 협력사 , 06 : 브랜드 , 07 : 채널
        List<CouponAplyInfoResponse> couponAplyInfo = ccPromBaseMapper.getPromotionAplyInfo(promoNo);
        if(couponAplyInfo != null && couponAplyInfo.size() > 0){
            for(CouponAplyInfoResponse cpAplyRespon : couponAplyInfo){
                Map<String, String> data = getMapAplyInfo(cpAplyRespon);
                if(cpAplyRespon.getFvrAplyGbCd().equals("01")){
                    if(MK014.SITE.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplySites().add(data);
                    }else if(MK014.GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplyGoods().add(data);
                    }else if(MK014.CATEGORY.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplyCategory().add(data);
                    }else if(MK014.STD_GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplyStdGoods().add(data);
                    }else if(MK014.ENTR.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplyEntr().add(data);
                    }else if(MK014.BRAND.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplyBrand().add(data);
                    }else if(MK014.CHANNEL.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getAplyChannel().add(data);
                    }
                }else{
                    if(MK014.GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getExceptGoods().add(data);
                    }else if(MK014.STD_GOODS.isEquals(cpAplyRespon.getFvrAplyTypCd())){
                        promotionData.getExceptStdGoods().add(data);
                    }
                }
            }
        }

        //프로모션 사용요일 정도
        List<CouponUseWdayInfoResponse> couponWdayInfo = ccPromBaseMapper.getPromotionWdayInfo(promoNo);
        if(couponWdayInfo != null && couponWdayInfo.size() > 0){
            for(CouponUseWdayInfoResponse couponUseWdayInfoResponse : couponWdayInfo){
                promotionData.getUseWdayCd().add(couponUseWdayInfoResponse.getUseWdayCd());
            }
        }

        //프로모션 적용매체
        List<CouponAplyMediaResponse> couponMediaInfo = ccPromBaseMapper.getPromotionMediaInfo(promoNo);
        if(couponMediaInfo != null && couponMediaInfo.size() > 0){
            for(CouponAplyMediaResponse couponAplyMediaResponse : couponMediaInfo){
                promotionData.getAplyPsbMediaCd().add(couponAplyMediaResponse.getAplyPsbMediaCd());
            }
        }

        return promotionData;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePromotion(String promoNo) throws Exception {
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
    }

    public void insertPromotionAplyInfo(List<String> aplyList,CcPromBase ccPromBase,String aplyGbCd,String aplyTypCd){
        if(aplyList !=null && aplyList.size() > 0){
            List<String> distinctAplyInfo = aplyList.stream().distinct().collect(Collectors.toList());
            for(String aplyTarget : distinctAplyInfo){
                CcPromoAplyInfo ccPromoAplyInfo = new CcPromoAplyInfo();
                ccPromoAplyInfo.setPromoNo(ccPromBase.getPromoNo());
                ccPromoAplyInfo.setFvrAplyGbCd(aplyGbCd);
                ccPromoAplyInfo.setFvrAplyTypCd(aplyTypCd);
                ccPromoAplyInfo.setFvrTgtNo(aplyTarget);
                ccPromoAplyInfo.setSysRegId(ccPromBase.getSysRegId());
                ccPromoAplyInfo.setSysModId(ccPromBase.getSysModId());
                ccPromBaseTrxMapper.insertPromotionAplyInfo(ccPromoAplyInfo);
            }
        }
    }

    public Map<String,String> getMapAplyInfo(CouponAplyInfoResponse couponAplyInfoResponse){
        Map<String,String> data = new TreeMap<>();
        data.put("key",couponAplyInfoResponse.getFvrTgtNo());
        data.put("data",couponAplyInfoResponse.getFvrTgtNm()==null?"":couponAplyInfoResponse.getFvrTgtNm());
        return data;
    }

    public void validation(PromotionCudRequest request) throws Exception {
        //프로모션명
    	Validator.throwIfEmpty(request.getPromoNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoNm"}));

        //프로모션유형
        Validator.throwIfEmpty(request.getPromoTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoTypCd"}));

        //프로모션상태
        Validator.throwIfEmpty(request.getPromoStatCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoStatCd"}));

        //프로모션 기간
        Validator.throwIfEmpty(request.getPromoStrDtm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoStrDtm"}));

        //프로모션설명
        Validator.throwIfEmpty(request.getPromoDesc(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PromoDesc"}));

        //적용카드
        Validator.throwIfEmpty(request.getCardcoCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CardcoCd"}));

        //적용매체
        Validator.throwIfEmpty(request.getAplyPsbMediaCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"AplyPsbMediaCd"}));

        //회원등급
        Validator.throwIfEmpty(request.getMbrGradeCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"MbrGradeCd"}));

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
                throw new ValidationException(MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"apply target"}));
            }
        }

    }

}
