package com.enbiz.bo.base.interceptor;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.base.annotation.SkipAuthorityCheck;
import com.enbiz.bo.base.authority.AuthorityChecker;
import com.enbiz.bo.base.exception.AuthException;

import lombok.extern.slf4j.Slf4j;

/**
 * Controller Interceptor Class Interceptor for Timing / Login / Authorization
 * Process
 *
 * @author sys4u
 *
 */
@Slf4j
public class ControllerInterceptor implements HandlerInterceptor {

    private static final ThreadLocal<Long> START_TIME_THREAD_LOCAL = new ThreadLocal<Long>() {
        @Override
        protected Long initialValue() {
            return 0L;
        }
    };

    @Autowired
    private AuthorityChecker authorityChecker;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        START_TIME_THREAD_LOCAL.set(System.nanoTime());

        String uri = request.getRequestURI().substring(request.getContextPath().length() + 1);

        if (log.isDebugEnabled()) {
            log.debug(">>>> PreHandle for {}", uri);
        }

        if (uri.contains("ws-stomp/")) return true;

        // 페이지 인증 검사.
        boolean isAuthorized = authorizeAdminUser(request, response, handler, uri);
        if (isAuthorized) {
            return HandlerInterceptor.super.preHandle(request, response, handler);
        }

        return false;
    }

    private boolean authorizeAdminUser(HttpServletRequest request, HttpServletResponse response, Object handler,
            String uri)
            throws Exception {

        if (!(handler instanceof HandlerMethod)) {
        	processAuthException(request, handler);
        }

        HandlerMethod handlerMethod = (HandlerMethod) handler;

        boolean canSkipAuthority = checkSkipAuthority(handlerMethod, uri);
        if (canSkipAuthority) {
            return true;
        }

        LoginRequest adminUser = (LoginRequest)SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String queryParam = request.getQueryString();

        boolean isAuthorized = authorityChecker.canAccess(adminUser, uri, queryParam);

        if (!isAuthorized) {
            processAuthException(request, handler);
        }

        return true;
    }


    private boolean checkSkipAuthority(HandlerMethod handlerMethod, String uri) {
    	SkipAuthorityCheck skipAuthorityCheck = handlerMethod.getMethodAnnotation(SkipAuthorityCheck.class);
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (skipAuthorityCheck != null) { //SkipAuthorityCheck 어노테이션 사용한경우
            if (log.isDebugEnabled()) {
                log.debug("checkSkipAuthority true skipAuthorityCheck, uri : {}", uri);
            }
            return true;
        } else if (Arrays.asList(Constants.GUEST_URIS).contains("/"+uri)) {//Spring Security Permit ALL 인경우
        	if (log.isDebugEnabled()) {
        		log.debug("checkSkipAuthority true permit all, uri : {}", uri);
            }
            return true;
        } else if (!(principal instanceof LoginRequest)) {//로그인을 안한경우
        	if (log.isDebugEnabled()) {
        		log.debug("checkSkipAuthority true not login, uri : {}", uri);
            }
            return true;
        }

        return false;
    }

    private void processAuthException(HttpServletRequest request, Object handler) {
        String uri = request.getRequestURI();
        String message = "요청하신 URL에 접근할 권한이 없습니다. [" + uri + "]";

        AuthException authException = new AuthException(message);

        throw authException;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception{
        long elapsedTime = (System.nanoTime() - START_TIME_THREAD_LOCAL.get()) / 1000_000;

        if (log.isDebugEnabled()) {
            log.debug("<<<< AfterCompletion for {}, Elapsed Time = {}", request.getRequestURI(), elapsedTime);
        }

        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
