package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpMersInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpMersInfoResponse;

@Repository
@Lazy
public interface OpMersInfoMapper {

    /**
     * 가맹점관리 목록 조회
     * @param opMersInfoRequest
     * @return OpMersInfoResponse
     */
    List<OpMersInfoResponse> getFranchiseeList(OpMersInfoRequest opMersInfoRequest);

    /**
     * 가맹점관리 목록 수
     * @param opMersInfoRequest
     * @return int
     */
    int getFranchiseeListCount(OpMersInfoRequest opMersInfoRequest);

    /**
     * 가맹점관리 상세 조회
     * @param opMersInfoRequest
     * @return OpMersInfoResponse
     */
    OpMersInfoResponse franchiseeDetailInfo(OpMersInfoRequest opMersInfoRequest);

    /**
     * 가맹점관리 상세 조회 _ 사이트 리스트
     * @param opMersInfoRequest
     * @return OpMersInfoResponse
     */
    List<OpMersInfoResponse> franchiseeSiteList(OpMersInfoRequest opMersInfoRequest);

}
