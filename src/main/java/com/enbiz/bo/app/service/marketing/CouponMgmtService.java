package com.enbiz.bo.app.service.marketing;

import java.util.List;

import com.enbiz.bo.app.dto.request.marketing.CouponIssuedMemberRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponMgmtCudRequest;
import com.enbiz.bo.app.dto.request.marketing.CouponRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponIssuedMemberResponse;
import com.enbiz.bo.app.dto.response.marketing.CouponResponse;
import com.enbiz.bo.app.dto.response.marketing.PromotionDetailResponse;
import com.enbiz.bo.app.entity.CcCpnIsuMbr;

/**
 * 쿠폰 관리 서비스
 */
public interface CouponMgmtService {

    /**
     * 쿠폰 관리 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<CouponResponse> getCouponList(CouponRequest couponMgmtRequest) throws Exception;

    /**
     * 쿠폰 관리 수 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    int getCouponListCount(CouponRequest couponMgmtRequest) throws Exception;


    /**
     * 쿠폰 등록 및 업데이트
     *
     * @param request
     * @throws Exception
     */
    void saveCoupon(CouponMgmtCudRequest couponMgmtCudRequest) throws Exception;

    /**
     * 쿠폰 상세 정보 가져오기
     *
     * @param request
     * @return
     * @throws Exception
     */
    PromotionDetailResponse getCouponData(String promoNo) throws Exception;

    /**
     * 쿠폰 삭제
     *
     * @param promoNo
     * @throws Exception
     */
    void deleteCoupon(String promoNo) throws Exception;

    /**
     * 쿠폰 발급 회원 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<CouponIssuedMemberResponse> getCouponIssuedMemberList(CouponIssuedMemberRequest couponMgmtIssuedMemberRequest) throws Exception;

    /**
     * 쿠폰 발급 회원 수 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    int getCouponIssuedMemberListCount(CouponIssuedMemberRequest couponMgmtIssuedMemberRequest) throws Exception;

    /**
     * 쿠폰 발급 회원 등록
     *
     * @param insert
     * @throws Exception
     */
    void registCouponIssuedMember(List<CcCpnIsuMbr> insert) throws Exception;

    /**
     * 쿠폰 발급 대상 회원 Excel 데이터 추출
     */
    List<CouponIssuedMemberResponse> getExcelData(String cpnNo,List<CouponIssuedMemberResponse> list) throws Exception;

}