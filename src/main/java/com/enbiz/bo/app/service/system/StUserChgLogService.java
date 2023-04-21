package com.enbiz.bo.app.service.system;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.entity.StUserChgLog;

/**
 *
 * @author bypark
 *
 */
public interface StUserChgLogService {

    /**
     * 사용자정보변경로그 저장
     * @param mmsMsg
     * @throws Exception
     */
    void saveStUsrChgLog(StUserChgLog stUserChgLog) throws Exception;
    
    /**
     * 패스워드 변경 이력 조회
     * @param stUsrChgLog
     * @throws Exception
     */
    int getStUserChgLogPwdChgCnt(LoginRequest loginRequest) throws Exception ;

    /**
     * 패스워드 변경 로깅
     * @param userId 타겟 유저아이디
     * @param beforePasswd 이전 비밀번호
     * */
    void savePasswdChgLog(String userId, String beforePasswd) throws Exception;

    /**
     * 유저 생성 로깅
     * @param userId 타겟 유저아이디
     * */
    void saveCreateUserLog(String userId) throws Exception;

    /**
     * 권한그룹 변경 로깅
     * @param userId 타겟 유저아이디
     * @param beforeRtGrpNo 변경 전 권한그룹번호
     * */
    void saveRtGrpChangeLog(String userId, String beforeRtGrpNo) throws Exception;
}
