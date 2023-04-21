package com.enbiz.bo.app.repository.customerservice;


import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsAssignRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAssignRetrieveRequest;
import com.enbiz.bo.app.dto.request.customerservice.IntegratedCounselRequest;
import com.enbiz.bo.app.dto.response.common.DashboardGoodsQnaIngResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsAssignResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnOrdGoodsResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCcnProcInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsRelatedResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTelPrmsResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsTransReqResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCounselResponse;
import com.enbiz.bo.app.dto.response.customerservice.IntegratedCsDetailResponse;
import com.enbiz.bo.app.entity.CsCustCnslInfo;

/**
 * 고객상담정보
 */

@Repository
@Lazy
public interface CsCustCnslInfoTrxMapper {

    /**
     * 통합상담관리 목록 조회
     * @return
     * @throws Exception
     */
    List<IntegratedCounselResponse> integrateCounselingList(IntegratedCounselRequest IntegratedCounselRequest) throws Exception;

    /**
     * 통합상담관리 목록 조회수
     * @param IntegratedCounselRequest
     * @throws Exception
     */
    int integrateCounselingListCount(IntegratedCounselRequest IntegratedCounselRequest) throws Exception;

    /**
     * 통합상담관리 update
     */
    void updateCsCustCnslInfo(CsCustCnslInfo csCustCnslInfo) throws Exception;


    /**
     * 통합상담관리 1:1 문의 update
     */
    void postOneToOneInquiry(CsCustCnslInfo csCustCnslInfo) throws Exception;


    /**
     * 통합상담관리 상세 - 문의내역 및 답변처리
     */
    IntegratedCsDetailResponse getIntegrateCsDetail(String ccnNo);

    /**
     * 통합상담관리 상세 - 상담상품정보
     */
    List<CsCcnOrdGoodsResponse> getIntegrateOrdAndGoodsInfo(String ccnNo);

    /**
     * 통합상담관리 상세 - 처리내역
     */
    List<CsCcnProcInfoResponse> getIntegrateProcInfo(String ccnNo);

    /**
     * 통합상담관리 상세 - 고객전화약속정보
     */
    List<CsTelPrmsResponse> getCsTelPrmsInfo(String ccnNo);

    /**
     * 통합상담관리 상세 - 고객상담이관요청정보
     */
    List<CsTransReqResponse> getCsTransReqInfo(String ccnNo);

    /**
     * 고객상담정보 insert
     */
    void insertCsCustCnslInfo(CsCustCnslInfo csCustCnslInfo) throws Exception;

    /**
     * 고객상담정보 전화약속 없을경우 update
     */
    void updateProcNoCallCsCustCnslInfo(CsCustCnslInfo csCustCnslInfo) throws Exception;

    /**
     * 고객상담정보 전화약속 있을경우 update
     */
    void updateProcCsCustCnslInfo(CsCustCnslInfo csCustCnslInfo) throws Exception;

    /**
     * 관련상담내역
     */
    List<IntegratedCsDetailResponse> getRelatedConsultation(CsRelatedResponse csRelatedResponse);

    /**
     * 고객상담정보 고객상담진행상태코드 update
     */
    void updateCsInfoPrgsStatCd(CsCustCnslInfo csCustCnslInfo);

    List<DashboardGoodsQnaIngResponse> getDashboardGoodsQnaIngList();

    /**
     * 상담할당 목록
     */
    List<CsAssignResponse> csAllocationManagementService(CsAssignRequest request);

    /**
     * 상담할당관리 > 업무유형별 담당자 목록
     */
    List<CsAssignResponse> csAllocationDtlManagementService(CsAssignRequest request);


    /**
     * 상담할당관리 > 할당회수 OB 상담번호 List
     */
    List<String> retrieveObCcnNoSelect(CsAssignRetrieveRequest request);

    /**
     * 상담할당관리 > 할당회수 1:1 상담번호 List
     */
    List<String> retrieveOneToOneCcnNoSelect(CsAssignRetrieveRequest request);

    /**
     * 상담할당관리 > 할당회수 ( QnA , (OB,전체) , (1:1,전체) 상담번호 List
     */
    List<String> retrieveCcnNoSelect(CsAssignRetrieveRequest request);


    /**
     * 상담할당관리 > 할당회수 OB
     */
    void retrieveObAllcation(CsAssignRetrieveRequest request);

    /**
     * 상담할당관리 > 할당회수 1:1
     */
    void retrieveOneToOneAllcation(CsAssignRetrieveRequest request);

    /**
     * 상담할당관리 > 할당회수 ( QnA , (OB,전체) , (1:1,전체)
     */
    void retrieveAllcation(CsAssignRetrieveRequest request);
}
