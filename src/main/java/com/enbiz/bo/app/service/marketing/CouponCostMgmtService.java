package com.enbiz.bo.app.service.marketing;

import java.util.List;

import com.enbiz.bo.app.dto.request.marketing.CouponCostRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponCostResponse;

/**
 * 쿠폰 관리 서비스
 */
public interface CouponCostMgmtService {

    /**
     * 쿠폰비용관리 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    List<CouponCostResponse> getCouponCostList(CouponCostRequest couponCostMgmtRequest) throws Exception;

    /**
     * 쿠폰비용관리수 조회
     *
     * @param request
     * @return
     * @throws Exception
     */
    int getCouponCostListCount(CouponCostRequest couponCostMgmtRequest) throws Exception;

}