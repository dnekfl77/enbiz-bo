package com.enbiz.bo.app.service.customerservice;

import java.util.List;
import java.util.Map;

import com.enbiz.bo.app.dto.request.customerservice.CsCompensReturnRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensAcceptInfoRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsCustomerCompensRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensDetailResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsCustomerCompensResponse;
import com.enbiz.bo.app.entity.CsCustomerCompensAcceptInfo;
import com.enbiz.bo.app.entity.StStdCd;

/**
 * 고객보상관리
 */
public interface CustomerCompensMgmtService {

    /**
     * 고객보상 목록 조회
     */
    public List<CsCustomerCompensResponse> getCustomerCompensList(CsCustomerCompensRequest request) throws Exception;

    /**
     * 고객보상 목록수 조회
     */
    public int getCustomerCompensListCount(CsCustomerCompensRequest request ) throws Exception;

    /**
     * 고객보상신청번호 List -> 고객 보상접수정보 조회
     */
    public List<CsCustomerCompensAcceptInfo> getCustomerCompensInfo(String[] custCpnsAplyNoList,String type) throws Exception;

    /**
     * 고객보상 상세 화면 데이터 조회
     */
    public CsCompensDetailResponse getCustomerCompensDetail(String custCpnsAplyNo) throws Exception;

    /**
     * 고객보상 사용자 권한 확인
     */
    public String getCsCompensUserGrade(String loginId) throws Exception;

    /**
     * 고객보상 ( 변경적용 )
     */
    public void updateCustomerCompensDetail(CsCustomerCompensAcceptInfoRequest request) throws Exception;

    /**
     *  고객보상 ( 접수취소 및 반려 )
     */
    public void returnCustomerCompensDetail(CsCompensReturnRequest request) throws Exception;


    /**
     * 고객보상 ( 보상승인 , 지급승인 )
     */
    public void approveCustomerCompensDetail(CsCustomerCompensAcceptInfoRequest request, Map<String, List<StStdCd>> cs026Code) throws Exception;

}
