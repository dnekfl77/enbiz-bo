package com.enbiz.bo.app.service.marketing;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.marketing.CouponCostRequest;
import com.enbiz.bo.app.dto.response.marketing.CouponCostResponse;
import com.enbiz.bo.app.repository.marketing.CcPromBaseMapper;

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
public class CouponCostMgmtServiceImpl implements CouponCostMgmtService{

    private final CcPromBaseMapper ccPromBaseMapper;

    @Override
    public List<CouponCostResponse> getCouponCostList(CouponCostRequest request) throws Exception {
        return ccPromBaseMapper.getCouponCostManageList(request);
    }

    @Override
    public int getCouponCostListCount(CouponCostRequest request) throws Exception {
        return ccPromBaseMapper.getCouponCostManageListCount(request);
    }
}
