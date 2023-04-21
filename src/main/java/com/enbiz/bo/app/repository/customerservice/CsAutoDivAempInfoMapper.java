package com.enbiz.bo.app.repository.customerservice;


import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsAutoDivideAempRequest;
import com.enbiz.bo.app.dto.request.customerservice.CsDeptUserRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptAempResponse;

/**
 * CS 자동배분 담당자 정보
 */
@Repository
@Lazy
public interface CsAutoDivAempInfoMapper {


    /**
     * 자동배분 설정 popup 부서별 담당자 정보
     */
    List<CsDeptAempResponse> getAutoDistributionManagerList(CsDeptUserRequest request) throws Exception;

    /**
     * 자동배분 설정 popup 부서별 담당자 정보
     */
    int getAutoDistributionManagerListCount(CsDeptUserRequest request) throws Exception;

    /**
     * CS 자동배분담당자 중복 체크 CREATE
     */
    boolean checkValidateManager(CsAutoDivideAempRequest request) throws Exception;


    /**
     * CS 자동배분담당자 중복 체크 CREATE (업무유형(중) 없는경우)
     */
    boolean checkValidateNoDtlManager(CsAutoDivideAempRequest request) throws Exception;
}
