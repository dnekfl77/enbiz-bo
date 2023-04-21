package com.enbiz.bo.base.security;

import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AdminAuthenticationFailureHandler implements AuthenticationFailureHandler {
	
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
            HttpServletResponse response, AuthenticationException exception) throws ServletException {
		try {
			String message = (String)request.getAttribute("loginReturnMessage");
			String url = (String)request.getAttribute("returnUrl");
			
			String returnUrl = "redirect.do?url="+URLEncoder.encode(url, "UTF-8")+"&message="+URLEncoder.encode(message, "UTF-8");
			
			redirectStrategy.sendRedirect(request, response, returnUrl);
			
		} catch (Exception e) {
			throw new ServletException(e.getMessage());
		}
	}
	
}
