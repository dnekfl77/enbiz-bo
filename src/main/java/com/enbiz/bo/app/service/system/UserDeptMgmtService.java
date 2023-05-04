package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.UserDeptRequest;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;

public interface UserDeptMgmtService {

	   /**
     * 부서 계층구조 목록 조회
     * @return 표준 분류 목록
     * @throws Exception
     */
    List<UserDeptResponse> getUserDeptListWithHierarchy() throws Exception;

    /**
     * 부서 목록 수 조회
     * @param UserDeptRequest
     * @return 하위 표준 분류 목록 수
     * @throws Exception
     */
    int getUserDeptListCount(UserDeptRequest request) throws Exception;

    /**
     * 부서 목록 조회
     * @param UserDeptRequest
     * @return 하위 표준 분류 목록
     * @throws Exception
     */
    List<UserDeptResponse> getUserDeptList(UserDeptRequest request) throws Exception;

    /**
     * 부서 목록 저장
     * @param createList 추가 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void saveUserDeptList(RealGridCUDRequest<UserDeptRequest> realGridCUD) throws Exception;
}
