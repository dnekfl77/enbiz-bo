package com.enbiz.bo.app.service.system;

import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;

/**
 * 패스워드 변경 서비스
 */
public interface PasswordChangeService {

    /**
     * 패스워드 변경
     * @param  request
     * @return void
     * @throws Exception
     */
    void changePassword(PasswordChangeRequest request) throws Exception;

    /**
     * 패스워드 일치 확인
     * @param  request
     * @return void
     * @throws Exception
     */
    boolean checkCurrentPassword(PasswordChangeRequest request) throws Exception;

}
