package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.UserDetailRequest;
import com.enbiz.bo.app.dto.request.system.UserListRequest;
import com.enbiz.bo.app.dto.response.system.UserDetailResponse;
import com.enbiz.bo.app.dto.response.system.UserListResponse;
/**
 * 사용자관리 서비스
 */
public interface UserMgmtService {


    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 수 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    int getUserListInUserMenuCount(UserListRequest userListRequest);

    /**
     * 조건에 맞는 사용자 목록 조회
     * @param  userListRequest
     * @return 사용자 목록
     * @throws
     */
    List<UserListResponse> getUserListInUserMenu(UserListRequest userListRequest);

    /**
     * 사용자 상세정보 조회
     * @param  userId
     * @return 사용자 상세정보
     * @throws
     */
    UserDetailResponse getUserDetail(String userId);

    /**
     * 사용자 카운트 조회
     * @param  userId
     * @return 사용자 카운트
     * @throws
     */
    int getUserCount(String userId);

    /**
     * 비밀번호 잠김 해제
     *
     * @param userId
     * @return UserDetailResponse
     * @throws
     */
    UserDetailResponse unlockPassword(String userId) throws Exception;

    /**
     * 비밀번호 초기화
     *
     * @param userId
     * @return void
     * @throws
     */
    UserDetailResponse initializePassword(String userId) throws Exception;

    /**
     * 사용자 저장
     *
     * @param request
     * @return 저장된 사용자정보
     * @throws
     */
    UserDetailResponse saveUser(UserDetailRequest request) throws Exception;

}
