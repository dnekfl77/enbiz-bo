package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpPayMeanCtrlInfoResponse;

@Repository
@Lazy
public interface OpPayMeanCtrlDtlInfoMapper {

    /**
     * 제어 상세 목록 조회
     * @return
     */
    List<OpPayMeanCtrlInfoResponse> getMethodsOfPaymentControlDetail(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest);

    /**
     * 제어 상세 목록 조회 수
     * @return int
     */
    int getMethodsOfPaymentControlDetailCount(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest);

}
