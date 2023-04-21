package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpPayMeanCtrlInfoResponse;

@Repository
@Lazy
public interface OpPayMeanCtrlInfoMapper {

    /**
     * 결제수단 제어 목록 조회
     * @return
     */
    List<OpPayMeanCtrlInfoResponse> getMethodsOfPaymentControlList(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest);

    /**
     * 결제수단 제어 목록 수
     * @return int
     */
    int getMethodsOfPaymentControlListCount(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest);

    /**
     * 결제수단 제어관리 정보, 안내공지 조회
     * @return
     */
    OpPayMeanCtrlInfoResponse methodsOfPaymentControlDetailInfo(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest);

}
