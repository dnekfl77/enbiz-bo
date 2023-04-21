package com.enbiz.bo.base.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.entity.StLoginLog;
import com.enbiz.bo.app.service.login.LoginService;
import com.enbiz.common.base.util.SystemUtils;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AdminLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler implements LogoutSuccessHandler {
	
    @Autowired
    private LoginService loginService;
	
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
    	
    	LoginRequest loginRequest = (LoginRequest)authentication.getPrincipal();
    	
    	StLoginLog stLoginLog = new StLoginLog();

        stLoginLog.setLoginIpAddr(SystemUtils.getRemoteIP());
        stLoginLog.setSysGbCd("11"); // 백오피스
        stLoginLog.setUserId(loginRequest.getLoginId());
        stLoginLog.setSysRegId(loginRequest.getLoginId());
        stLoginLog.setSysModId(loginRequest.getLoginId());

        try {
			loginService.updateStLoginLog(stLoginLog);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
        super.onLogoutSuccess(request, response, authentication);
    }
}
