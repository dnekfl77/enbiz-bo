package com.enbiz.bo.app.service.customerservice;

import java.util.ArrayList;
import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsAssignRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAssignRetrieveRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAutoDivideAempRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsAutoMangersRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsDeptUserRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsObCounselInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsAssignResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsAutoDivideAempInfoResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptAempResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptUserResponse;
import com.enbiz.bo.app.dto.response.customerservice.CsObCounselInfoResponse;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;
import com.enbiz.bo.app.entity.CsAutoDivideAempInfo;
import com.enbiz.common.base.entity.BaseCommonEntity;

/**
 * 상담할당관리 Service
 */
public interface CsAllocationMgmtService {
	
	/**
     * 자동배분상세번호 가져오기
     */
	public List<CsAutoDivideAempInfoResponse> getAutoDivideDetailNo(String autoDivGbCd) throws Exception;
	
	/**
     * 상담할당목록
     */
	public List<CsAssignResponse> csAllocationMgmtList(CsAssignRequest request) throws Exception;
	
	/**
     * 업무유형별 담당자 목록
     */
	public List<CsAssignResponse> csAllocationDetailMgmtList(CsAssignRequest request) throws Exception;
	
	/**
     * 상담할당관리 > 할당회수
     */
	public void retrieveAllcations(ArrayList<CsAssignRetrieveRequest> request) throws Exception;
	
	/**
     * OB 업무등록 excel file date setting
     */
	public void settingObCsCounselInfoListExcel(List<? extends BaseCommonEntity> list,String cnslTypNo ,String obTypNo);
	
	/**
     * OB 업무 일괄등록
     */
	public List<CsObCounselInfoResponse> saveObCsCounselInfoListExcel(List<CsObCounselInfoRequest> createList) throws Exception;
	
	
	/**
     * 자동배분 설정 popup 부서코드 tree data 조회
     */
    List<UserDeptResponse> getCsDeptList() throws Exception;


    /**
     * 자동배분 설정 popup 부서별 사용자 목록 조회
     */
    List<CsDeptUserResponse> getCsDeptUserList(CsDeptUserRequest request) throws Exception;

    /**
     * 자동배분 설정 popup 부서별 사용자 목록수 조회
     */
    int getCsDeptUserListCount(CsDeptUserRequest request) throws Exception;

    /**
     * 자동배분 설정 popup 부서별 담당자 정보
     */
    List<CsDeptAempResponse> getAutoDistributionManagerList(CsDeptUserRequest request) throws Exception;

    /**
     * 자동배분 설정 popup 부서별 담당자 정보
     */
    int getAutoDistributionManagerListCount(CsDeptUserRequest request) throws Exception;

    /**
     * 자동배분 등록
     */
    void saveAutoDistributionManager(List<CsAutoDivideAempInfo> createList,List<CsAutoDivideAempInfo> updateList,List<CsAutoDivideAempInfo> deleteList) throws Exception;

    /**
     * CS 자동배분담당자  중복 체크
     */
    boolean checkValidateManager(CsAutoDivideAempRequest request) throws Exception;

    /**
     * 자동배분담당자 할당진행 여부 변경
     */
    void changeAutoDivideAllocationPossibleYn(CsAutoMangersRequest request) throws Exception;

}
