package com.enbiz.bo.app.repository.marketing;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.marketing.CouponCostRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponIssuedMemberRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponRequest;
import com.enbiz.bo.app.dto.request.marketing.PromotionRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponAplyInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponAplyMediaResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponCostResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponExcelMbrResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponIssuedMemberResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponUseWdayInfoResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionResponse;


@Repository
@Lazy
public interface CcPromBaseMapper {

    /**
     * 쿠폰 관리 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<CouponResponse> getCouponManagingList(CouponRequest request) throws Exception;

    /**
     * 쿠폰 관리 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getCouponManagingListCount(CouponRequest request) throws Exception;


    /**
     * 쿠폰 상세
     * @param promoNo
     * @return
     * @throws Exception
     */
    PromotionDetailResponse getPromotionData(String promoNo) throws Exception;

    /**
     * 쿠폰 적용정보
     * @return
     * @throws Exception
     */
    List<CouponAplyInfoResponse> getPromotionAplyInfo(String promoNo) throws Exception;

    /**
     * 쿠폰 미디어 매체
     * @param promoNo
     * @return
     * @throws Exception
     */
    List<CouponAplyMediaResponse> getPromotionMediaInfo(String promoNo) throws Exception;

    /**
     * 쿠폰 사용요일
     * @param promoNo
     * @return
     * @throws Exception
     */
    List<CouponUseWdayInfoResponse> getPromotionWdayInfo(String promoNo) throws Exception;

    /**
     * 쿠폰 발급 회원 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<CouponIssuedMemberResponse> getCouponIssuedMbrList(CouponIssuedMemberRequest request) throws Exception;

    /**
     * 쿠폰 발급 회원 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getCouponIssuedMbrListCount(CouponIssuedMemberRequest request) throws Exception;

    /**
     * 회원 정보 조회
     * @param param
     * @return
     * @throws Exception
     */
    List<CouponExcelMbrResponse> getMbrList(String[] param) throws Exception;

    /**
     * 쿠폰 관리 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<CouponCostResponse> getCouponCostManageList(CouponCostRequest request) throws Exception;

    /**
     * 쿠폰 관리 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getCouponCostManageListCount(CouponCostRequest request) throws Exception;

    /**
     * 프로모션 관리 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<PromotionResponse> getPromotionManagingList(PromotionRequest request) throws Exception;

    /**
     * 프로모션 관리 목록수 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    int getPromotionManagingListCount(PromotionRequest request) throws Exception;


}

