package com.enbiz.bo.app.service.login;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;
import com.enbiz.bo.app.dto.response.login.LoginResponse;
import com.enbiz.bo.app.entity.StLoginLog;

public interface LoginService {

    /**
     * 유효한 사용자 인증
     * @param loginRequest
     * @return
     * @throws Exception
     */
    LoginResponse getUserCertification(LoginRequest loginRequest) throws Exception;

    /**
     * 비밀번호 찾기 시 아이디 잠금 해제
     * @param loginRequest
     * @throws Exception
     */
    void updateIdUnlock(LoginRequest loginRequest)  throws Exception;

    /**
     * 3개월 이상 비로그인 잠금 설정
     * @param loginRequest
     * @throws Exception
     */
    void updateIdLockYnCheck(LoginRequest loginRequest)  throws Exception;

    /**
     * 로그인했던 이력을 조회
     * @param loginRequest
     * @return
     * @throws Exception
     */
    LoginResponse getStUserBaseExistsLogin(LoginRequest loginRequest) throws Exception;

    /**
     * 로그인 성공 업데이트
     * @param loginRequest
     * @throws Exception
     */
	void updateLoginSuccess(LoginRequest loginRequest) throws Exception;

    /**
     * 로그인 실패 횟수 증가
     * @param loginRequest
     * @throws Exception
     */
	void updateLoginFailCntAdd(LoginRequest loginRequest) throws Exception;

	 /**
     * 로그인 로그 생성
     * @param stLoginLog
     * @throws Exception
     */
    void insertStLoginLog(StLoginLog stLoginLog) throws Exception;

    /**
     * 로그 아웃 로그
     * @param stLoginLog
     * @throws Exception
     */
    void updateStLoginLog(StLoginLog stLoginLog) throws Exception;

    void updatePasswordByPasswordInitialize(PasswordChangeRequest request) throws Exception;
    
    LoginResponse getLoginUser(String loginId) throws Exception;

}
