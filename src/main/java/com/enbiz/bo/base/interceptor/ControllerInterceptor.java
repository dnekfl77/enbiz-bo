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
import com.enbiz.bo.app.entity.StIndInfoQryLog;
import com.enbiz.bo.app.entity.StRtTgtBase;
import com.enbiz.bo.app.entity.StRtTgtBaseLog;
import com.enbiz.bo.app.enums.UR010;
import com.enbiz.bo.app.service.system.MonitoringMgmtService;
import com.enbiz.bo.app.service.system.PersonInfoLogMgmtService;
import com.enbiz.bo.base.annotation.SkipAuthorityCheck;
import com.enbiz.bo.base.authority.AuthorityChecker;
import com.enbiz.bo.base.exception.AuthException;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.util.SystemUtils;

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
    private MonitoringMgmtService monitoringMgmtService;
    @Autowired
    private PersonInfoLogMgmtService personInfoLogMgmtService;
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

        if(adminUser != null){
            adminUser.setCaloUrl(uri);
            workLogInsert(request, adminUser, uri);
        }

        return true;
    }

    private void workLogInsert(HttpServletRequest request, LoginRequest adminUser, String uri) throws Exception{
        StRtTgtBase stRtTgtBase = new StRtTgtBase();

        stRtTgtBase.setCallUrl(uri);
        stRtTgtBase.setSysGbCd(adminUser.getSysGbCd());

        String rtTgtSeq=null;
        String custInfoInclYn=null;

        try {
            //호출한 주소를 가지고 권한대상 기본정보 조회
            StRtTgtBase resultStRtTgtBase = monitoringMgmtService.getRtTgtSeqByStRtTgtBase(stRtTgtBase);

            if(resultStRtTgtBase != null) {
                rtTgtSeq = resultStRtTgtBase.getRtTgtSeq();
                custInfoInclYn = resultStRtTgtBase.getCustInfoInclYn();
                if(UR010.SCREEN.getCd().equals(resultStRtTgtBase.getRtTgtTypCd())) {
                    request.setAttribute("rtTgtSeq", resultStRtTgtBase.getRtTgtSeq());
                }
            }
        } catch(Exception e) {
            log.error(e.getMessage(), e);
        }

        //권한대상사용로그 저장
        StRtTgtBaseLog stRtTgtBaseLog = new StRtTgtBaseLog();

        stRtTgtBaseLog.setUserId(adminUser.getUserId());
        stRtTgtBaseLog.setRtTgtSeq(rtTgtSeq);
        stRtTgtBaseLog.setRtGrpNo(adminUser.getRtGrpNo());
        stRtTgtBaseLog.setCallUrl(uri);
        stRtTgtBaseLog.setIpAddr(SystemUtils.getRemoteIP());

        String queryString = request.getQueryString() == null ? "" : request.getQueryString();

        queryString = queryString.length() > 1333 ? queryString.substring(0, 1310) + "... [ommitted]" : queryString;

        stRtTgtBaseLog.setPrmtInfo(queryString);
        stRtTgtBaseLog.setSysRegId(adminUser.getLoginId());

        try{
            monitoringMgmtService.insertStRtTgtBaseLog(stRtTgtBaseLog);
        } catch(Exception e) {
            log.error("StRtTgtBaseLog insert error ==> " + e.getMessage(), e);
        }

        //개인정보조회로그 저장
        if( custInfoInclYn != null && BaseConstants.Y.equals(custInfoInclYn)) {
            StIndInfoQryLog stIndInfoQryLog = new StIndInfoQryLog();

            stIndInfoQryLog.setUserId(adminUser.getUserId());
            stIndInfoQryLog.setRtTgtSeq(rtTgtSeq);
            stIndInfoQryLog.setRtGrpNo(adminUser.getRtGrpNo());
            stIndInfoQryLog.setCallUrl(uri);
            stIndInfoQryLog.setIpAddr(SystemUtils.getRemoteIP());
            stIndInfoQryLog.setPrmtInfo(queryString);
            stIndInfoQryLog.setSysRegId(adminUser.getLoginId());

            try{
                personInfoLogMgmtService.insertStIndInfoQryLog(stIndInfoQryLog);
            } catch(Exception e) {
                log.error("StIndInfoQryLog insert error ==> " + e.getMessage(), e);
            }
        }
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

    @SuppressWarnings("unchecked")
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception{
        long elapsedTime = (System.nanoTime() - START_TIME_THREAD_LOCAL.get()) / 1000_000;

        if (log.isDebugEnabled()) {
            log.debug("<<<< AfterCompletion for {}, Elapsed Time = {}", request.getRequestURI(), elapsedTime);
        }

        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
