package com.enbiz.bo.app.service.vendor;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateAndOthersRequest;
import com.enbiz.bo.app.dto.request.vendor.CooperateSearchRequest;
import com.enbiz.bo.app.dto.request.vendor.PartnerSearchRequest;
import com.enbiz.bo.app.dto.response.vendor.CooperateAndOthersResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateResponse;
import com.enbiz.bo.app.dto.response.vendor.CooperateSearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerDeliveryPolicySearchResponse;
import com.enbiz.bo.app.dto.response.vendor.PartnerSearchResponse;
import com.enbiz.bo.app.entity.CcChlBase;
import com.enbiz.bo.app.entity.CcChlDtlInfo;
import com.enbiz.bo.app.entity.EtEntrBase;

public interface VendorManagementService {

    /**
     * 협력사 조회수
     */
    int getPartnerSearchListCount(PartnerSearchRequest partnerSearchRequest) throws Exception;

    /**
     * 협력사 조회결과
     */
    List<PartnerSearchResponse> getPartnerSearchList(PartnerSearchRequest partnerSearchRequest) throws Exception;

    /**
     * 배송비 관리 조회수
     */
    int getDeliveryPolicySearchListCount(PartnerSearchRequest partnerSearchRequest) throws Exception;

    /**
     * 배송비 관리 조회결과
     */
    List<PartnerDeliveryPolicySearchResponse> getDeliveryPolicySearchList(
            PartnerSearchRequest partnerSearchRequest) throws Exception;

    int getCooperateSearchListCount(CooperateSearchRequest cooperateSearchRequest) throws Exception;

    List<CooperateSearchResponse> getCooperateSearchList(
            CooperateSearchRequest cooperateSearchRequest) throws Exception;

    CooperateResponse getCooperateDetail(String entrNo) throws Exception;

    int getCooperateChannelSearchListCount(CooperateSearchRequest cooperateSearchRequest) throws Exception;

    List<CooperateSearchResponse> getCooperateChannelSearchList(
            CooperateSearchRequest cooperateSearchRequest) throws Exception;

    int getCcChlBaseByEntrNoCount(String entrNo) throws Exception;

    List<CcChlBase> getCcChlBaseByEntrNoList(String entrNo) throws Exception;

    void saveCcChlBase(List<CcChlBase> createCcChlBaseList,
                                         List<CcChlBase> updateCcChlBaseList,
                                         List<CcChlBase> deleteCcChlBaseList) throws Exception;

    int getCcChlDtlInfoByChlNoCount(String chlNo) throws Exception;

    List<CcChlDtlInfo> getCcChlDtlInfoByChlNoList(String chlNo) throws Exception;

    void saveCcChlDtlInfo(List<CcChlDtlInfo> createList,
                                    List<CcChlDtlInfo> updateList,
                                    List<CcChlDtlInfo> deleteList) throws Exception;

    CooperateAndOthersResponse getCooperateAndOthersByEntrNo(CooperateAndOthersRequest cooperateAndOthersRequest)
            throws Exception;

    void saveCooperateWithOtherData(RawRealGridCUDRequest rawCUDRequest, EtEntrBase etEntrBase) throws Exception;
}
