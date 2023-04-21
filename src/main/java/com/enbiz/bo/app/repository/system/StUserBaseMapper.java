package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsDeptUserRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.popup.StUserBaseRequest;
import com.enbiz.bo.app.dto.request.system.UserListRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsDeptUserResponse;
import com.enbiz.bo.app.dto.response.login.LoginResponse;
import com.enbiz.bo.app.dto.response.popup.StUserBaseResponse;
import com.enbiz.bo.app.dto.response.system.UserListResponse;
import com.enbiz.bo.app.entity.StUserBase;

/**
 * 사용자 관리 DAO
 */
@Repository
@Lazy
public interface StUserBaseMapper {

    /**
     * 사용자 목록 수 조회
     * @param stUserBase
     * @return 사용자 목록 수
     */
    int getUserListCount(StUserBaseRequest stUserBase) throws Exception;

    /**
     * 사용자 목록 조회
     * @param stUserBase
     * @return 사용자 목록
     */
    List<StUserBaseResponse> getUserList(StUserBaseRequest stUserBase) throws Exception;

    /**
     * 사용자 목록 조회 (페이징 처리 미포함)
     * @param stUserBase
     * @return 사용자 목록
     */
    List<StUserBaseResponse> getUserListNoPage(StUserBaseRequest stUserBase);

    /**
     * 사용자아이디, 전화번호 로 사용여부 'Y' 인 사용자 조회
     * @param loginRequest
     * @return
     */
    LoginResponse getUserCertification(LoginRequest loginRequest) throws Exception;

    /**
     * 로그인사용자아이디와 원패스워드로 정보 갯수 get
     * @param loginRequest
     * @return
     */
    int getChagePasswordConfirm(LoginRequest loginRequest) throws Exception;

    /**
     * 로그인사용자아이디와 원패스워드로 정보 갯수 get
     * @param loginRequest
     * @return
     */
    int getChagePasswordDayCheck(LoginRequest loginRequest) throws Exception;

    /**
     * 사용자 정보를 조회한다.
     * @param requestedAdminUser
     * @return
     */
    LoginResponse getStUserBaseExistsLogin(LoginRequest requestedAdminUser) throws Exception;

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 수 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    int getUserListInUserMenuCount(UserListRequest userListRequest);



    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    List<UserListResponse> getUserListInUserMenu(UserListRequest userListRequest);

    /**
     * 사용자 상세정보 조회
     * @param userId
     * @return 사용자 상세정보
     */
    StUserBase getUserDetail(String userId);

    /**
     * 사용자 카운트 조회
     * @param userId
     * @return 사용자 카운트
     */
    int getUserCount(String userId);

    /**
     * 패스워드 조회
     * @param userParam
     */
    String getPasswd(String userId);

    /**
     * 부서별 사용자 목록 조회
     */
    List<CsDeptUserResponse> getDeptUserList(CsDeptUserRequest request);

    /**
     * 부서별 사용자 목록수 조회
     */
    int getDeptUserListCount(CsDeptUserRequest request);
    
    /**
     * 특정부서가 세팅되어 있는 사용자 정보 조회
     * @return
     */
    StUserBase getUserInfoMappedToDept(String deptCd);
    
}
