package com.enbiz.bo.app.repository.order;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.delivery.FullOrderRequest;
import com.enbiz.bo.app.dto.request.delivery.IndividualSendInstructRequest;
import com.enbiz.bo.app.dto.response.delivery.FullOrderResponse;
import com.enbiz.bo.app.dto.response.delivery.IndividualSendInstructResponse;
import com.enbiz.bo.app.entity.LoDeliDtl;
import com.enbiz.bo.app.entity.OpOrdDtl;
import com.enbiz.bo.app.entity.OpOrdDtlStatChgHist;

@Repository
@Lazy
public interface OpOrdDtlTrxMapper {

//    /**
//     * 전체주문조회 목록 조회
//     * @param fullOrderRequest
//     * @return
//     */
//    List<FullOrderResponse> getFullOrderInquiryList(FullOrderRequest fullOrderRequest);
//
//    /**
//     * 전체주문조회 목록 수
//     * @param fullOrderRequest
//     * @return int
//     */
//    int getFullOrderInquiryListCount(FullOrderRequest fullOrderRequest);
//
//    /**
//     * 엑셀다운로드_전체주문조회 목록 조회
//     * @param fullOrderRequest
//     * @return
//     */
//    List<FullOrderResponse> getExcelFullOrderInquiryList(FullOrderRequest fullOrderRequest);
//
//    /**
//     * 개별발송조회 목록 조회
//     * @param individualSendInstructRequest
//     * @return
//     */
//    List<IndividualSendInstructResponse> getIndividualSendInstructList(IndividualSendInstructRequest individualSendInstructRequest);
//
//    /**
//     * 개별발송조회 목록 수
//     * @param individualSendInstructRequest
//     * @return int
//     */
//    int getIndividualSendInstructListCount(IndividualSendInstructRequest individualSendInstructRequest);
//
    /**
     * 주문 상세 테이블 _ 주문내역상태코드(발송지시 21) 업데이트
     * @param opOrdDtl
     */
    void updateSendInstruct(OpOrdDtl opOrdDtl);
//
//    /**
//     * 배송단위번호에 속해있는 주문상세 주문번호 리스트
//     * @param individualSendInstructRequest
//     * @return
//     */
//    List<OpOrdDtlStatChgHist> getOrdSeqList(IndividualSendInstructRequest individualSendInstructRequest);
//
//    /**
//     * 배송단위번호에 속해있는 주문상세 리스트
//     * @param individualSendInstructRequest
//     * @return
//     */
//    List<LoDeliDtl> getDeliUnitList(IndividualSendInstructRequest individualSendInstructRequest);
}
