package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.UserDeptRequest;

/**
 * 사용자 부서 DAO
 */
@Repository
@Lazy
public interface StDeptCdTrxMapper {

    /**
     * 부서 목록 등록
     * @param StDeptCd
     */
    void insertStDeptCdList(List<UserDeptRequest> UserDeptRequest);

     /**
     * 부서 목록 수정
     * @param StDeptCd
     */
    void updateStDeptCdList(List<UserDeptRequest> UserDeptRequest);

    /**
     * 부서 목록 삭제
     * @param StDeptCd
     */
    void deleteStDeptCdList(List<UserDeptRequest> UserDeptRequest);

    /**
     * 부서 삭제
     * @param deleteInfo
     */
	void deleteStDeptCd(UserDeptRequest deleteInfo);    
}