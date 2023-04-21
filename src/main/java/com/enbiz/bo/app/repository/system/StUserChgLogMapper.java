package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.login.LoginRequest;

@Repository
@Lazy
public interface StUserChgLogMapper {
    int getStUserChgLogPwdChgCnt(LoginRequest loginRequest) throws Exception;
}
