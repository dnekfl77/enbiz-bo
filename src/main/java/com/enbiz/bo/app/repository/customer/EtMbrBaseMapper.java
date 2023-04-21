package com.enbiz.bo.app.repository.customer;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customer.CustomerDetailRequest;
import com.enbiz.bo.app.dto.request.customer.CustomerSearchRequest;
import com.enbiz.bo.app.dto.request.popup.MemberSearchRequest;
import com.enbiz.bo.app.dto.response.customer.CustomerDeliveryInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailOrderCallCountResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerDetailResponseEx;
import com.enbiz.bo.app.dto.response.customer.CustomerGradeHistoryResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerNoMaskingResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerRefundAccountInfoResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerSearchResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerTermsAgreeHistoryResponse;
import com.enbiz.bo.app.dto.response.customer.CustomerTermsAgreeInfoResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerResponse;
import com.enbiz.bo.app.dto.response.customer.WatchCustomerSearchResponse;
import com.enbiz.bo.app.dto.response.popup.MemberSearchResponse;

@Repository
@Lazy
public interface EtMbrBaseMapper {

    /**
     * 회원 목록
     */
    List<MemberSearchResponse> getMemberList(MemberSearchRequest memberSearchRequest);

    /**
     * 회원 목록 수
     */
    int getMemberListCount(MemberSearchRequest memberSearchRequest);

    int getSearchCustomerByCustomerMgmtViewCount(CustomerSearchRequest customerSearchRequest);

    List<CustomerSearchResponse> getSearchCustomerByCustomerMgmtViewData(CustomerSearchRequest customerSearchRequest);

    CustomerDetailResponseEx getCustomerDetailByMbrNo(CustomerDetailRequest customerDetailRequest);

    List<CustomerDeliveryInfoResponse> getCustomerDeliveryInfoByMbrNoList(CustomerDetailRequest customerDetailRequest);

    List<CustomerTermsAgreeInfoResponse> getCustomerTermsAgreeInfoByMbrNoSiteNoList(CustomerDetailRequest customerDetailRequest);

    int getCustomerDeliveryByMbrNoCount(CustomerDetailRequest customerDetailRequest);

    List<CustomerDeliveryInfoResponse> getCustomerDeliveryByMbrNoData(CustomerDetailRequest customerDetailRequest);

    int getCustomerTermsAgreeHistoryByMemberNoSiteNoCount(CustomerDetailRequest customerDetailRequest);

    List<CustomerTermsAgreeHistoryResponse> getCustomerTermsAgreeHistoryByMemberNoSiteNoData(CustomerDetailRequest customerDetailRequest);

    CustomerRefundAccountInfoResponse getCustomerRefundAccountInfoByMemberNo(CustomerDetailRequest customerDetailRequest);

    int getCustomerGradeHistoryByMbrNoCount(CustomerDetailRequest customerDetailRequest);

    List<CustomerGradeHistoryResponse> getCustomerGradeHistoryByMemberNoData(CustomerDetailRequest customerDetailRequest);

    int getWatchCustomerSearchByViewConditionCount(CustomerSearchRequest customerSearchRequest);

    List<WatchCustomerSearchResponse> getWatchCustomerSearchByViewConditionData(CustomerSearchRequest customerSearchRequest);

    CustomerDetailOrderCallCountResponse getCustomerDetailOrderCallCountByMemberNo(CustomerDetailRequest customerDetailRequest);

    int getWatchCustomerInfoByMbrNoCount(CustomerDetailRequest customerDetailRequest);

    List<WatchCustomerResponse> getWatchCustomerInfoByMbrNoData(CustomerDetailRequest customerDetailRequest);

    int getDormantCustomerBySearchConditionCount(CustomerSearchRequest customerSearchRequest);

    List<CustomerSearchResponse> getDormantCustomerBySearchConditionData(CustomerSearchRequest customerSearchRequest);

    /**
     * 회원 데이터 조회
     */
    CustomerNoMaskingResponse getMemberData(String mbrNo);
}
