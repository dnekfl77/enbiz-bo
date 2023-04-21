package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.UserDeptRequest;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;

/**
 * 사용자 부서 DAO
 */
@Repository
@Lazy
public interface StDeptCdMapper {

    /**
     * 부서 계층구조 목록 조회
     * @return 상품표준분류 계층구조 목록
     */
    List<UserDeptResponse> getStDeptCdListWithHierarchy();

    /**
     * 부서 목록 수
     * @param request
     * @return 하위 표준 분류 목록 수
     */
    int getStDeptCdListCount(UserDeptRequest request);

    /**
     * 부서 목록 조회
     * @param request
     * @return 하위 표준 분류 목록
     */
    List<UserDeptResponse> getStDeptCdList(UserDeptRequest request);

    /**
     * 특정부서 목록 가져오기
     * @return
     */
    List<UserDeptResponse> getSpecificGroupDeptCd(String jobGrpCd);

}