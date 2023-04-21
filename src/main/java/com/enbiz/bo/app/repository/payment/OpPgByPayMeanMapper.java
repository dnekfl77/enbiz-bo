package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpPgByPayMeanRequest;
import com.enbiz.bo.app.dto.response.payment.OpPgByPayMeanResponse;

@Repository
@Lazy
public interface OpPgByPayMeanMapper {

    /**
     * PG사 목록 조회
     * @return
     */
    List<OpPgByPayMeanResponse> getPgList();

    /**
     * PG사 목록 수
     * @return int
     */
    int getPgListCount();

    /**
     * 결제수단 목록 조회
     * @param opPgByPayMeanRequest
     * @return
     */
    List<OpPgByPayMeanResponse> getMethodsOfPaymentList(OpPgByPayMeanRequest opPgByPayMeanRequest);

    /**
     * 결제수단 목록 수
     * @param opPgByPayMeanRequest
     * @return int
     */
    int getMethodsOfPaymentListCount(OpPgByPayMeanRequest opPgByPayMeanRequest);

}
