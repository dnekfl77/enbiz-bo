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
     * 특정부서 목록 가져오기
     * @return
     */
    List<UserDeptResponse> getSpecificGroupDeptCd(String jobGrpCd);

}