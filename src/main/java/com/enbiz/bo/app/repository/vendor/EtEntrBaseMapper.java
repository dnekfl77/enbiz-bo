package com.enbiz.bo.app.repository.vendor;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.popup.EnEntrBaseRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateSearchRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerSearchRequest;
import com.enbiz.bo.app.dto.response.popup.EnEntrBaseResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateAndOthersResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateSearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerDeliveryPolicySearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerSearchResponse;
import com.enbiz.bo.app.entity.EtEntrBase;

@Repository
@Lazy
public interface EtEntrBaseMapper {

    /**
     * 협력사 목록 조회
     */
    List<EnEntrBaseResponse> getEtEntrBaseList(EnEntrBaseRequest etEntrBase) throws Exception;

    /**
     * 협력사 목록 수 조회
     */
    int getEtEntrBaseListCount(EnEntrBaseRequest etEntrBase);

    /**
     * 협력사 조회수
     */
    int getPartnerSearchListCount(PartnerSearchRequest partnerSearchRequest) throws Exception;

    /**
     * 협력사 조회
     */
    List<PartnerSearchResponse> getPartnerSearchList(PartnerSearchRequest partnerSearchRequest) throws Exception;

    EtEntrBase getEtEntrBaseOne(String entrNo);

    int getDeliveryPolicySearchListCount(PartnerSearchRequest partnerSearchRequest) throws Exception;

    List<PartnerDeliveryPolicySearchResponse> getDeliveryPolicySearchList(PartnerSearchRequest partnerSearchRequest) throws Exception;

    int getCooperateSearchListCount(CooperateSearchRequest cooperateSearchRequest) throws Exception;

    List<CooperateSearchResponse> getCooperateSearchList(CooperateSearchRequest cooperateSearchRequest) throws Exception;

    CooperateAndOthersResponse getCooperateDetail(String entrNo) throws Exception;

    int getCooperateChannelSearchListCount(CooperateSearchRequest cooperateSearchRequest);

    List<CooperateSearchResponse> getCooperateChannelSearchList(CooperateSearchRequest cooperateSearchRequest);

    int getCountOfExistsEtEntrBaseByEntrNm(EtEntrBase etEntrBase);
}
