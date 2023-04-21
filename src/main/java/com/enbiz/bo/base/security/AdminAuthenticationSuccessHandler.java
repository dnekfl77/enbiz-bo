package com.enbiz.bo.base.security;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.enbiz.bo.app.controller.messaging.ReceiveGate;
import com.enbiz.bo.app.controller.messaging.ReceiveGateRepository;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.service.login.LoginService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AdminAuthenticationSuccessHandler implements AuthenticationSuccessHandler  {
	
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private ReceiveGateRepository receiveGateRepository;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		String message = (String)request.getAttribute("loginReturnMessage");
		String url = (String)request.getAttribute("returnUrl");
		String loginTpCd = (String)request.getAttribute("loginTpCd");
		LoginRequest currentUser = (LoginRequest)authentication.getPrincipal();
		
		try {
			loginService.updateLoginSuccess(currentUser);
			
	        if ( receiveGateRepository.validGateById(currentUser.getLoginId()) ) {
	            ReceiveGate receiveGate = new ReceiveGate();

	            receiveGate.setId(currentUser.getLoginId());
	            receiveGate.setName(currentUser.getName());

	            receiveGateRepository.createReceiveGate(receiveGate);
	        }
			
			String returnUrl = "redirect.do?url="+URLEncoder.encode(url, "UTF-8")+"&message="+URLEncoder.encode(message, "UTF-8");
			
			redirectStrategy.sendRedirect(request, response, returnUrl);
		} catch (Exception e) {
			throw new ServletException(e.getMessage());
		}
	}
}
