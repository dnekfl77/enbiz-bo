package com.enbiz.bo.base.security;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.login.LoginResponse;
import com.enbiz.bo.app.entity.StLoginLog;
import com.enbiz.bo.app.service.login.LoginService;
import com.enbiz.bo.base.properties.DomainsConfig;
import com.enbiz.bo.base.properties.EnvironmentsConfig;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.SystemUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AdminAuthenticationProvider implements AuthenticationProvider {
	
    private static final String ACTION_LOGIN_FORM = "loginForm.do";
	
	private LoginService loginService;
	
	private DomainsConfig domainsConfig;
	
	public AdminAuthenticationProvider(LoginService loginService, DomainsConfig domainsConfig) {
		this.loginService = loginService;
		this.domainsConfig = domainsConfig;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        
        LoginRequest requestedLoggedinUser = new LoginRequest();
        requestedLoggedinUser.setLoginId(username);
        requestedLoggedinUser.setPassword(password);
        LoginRequest currentUser = null;
        try {
        	
			loginService.updateIdLockYnCheck(requestedLoggedinUser);
        
	        LoginResponse searchedLoginUser = loginService.getStUserBaseExistsLogin(requestedLoggedinUser);
			
	        String returnUrl = domainsConfig.get("baseUrl") + "main.do";
	
	        // 로그인속성코드
	        String loginTpCd = "10";
	        // 로그인리턴메세지
	        String loginReturnMessage = "";
	        String loginValidator = loginvalidator(request, searchedLoginUser, requestedLoggedinUser);
	
	        switch ( loginValidator ) {
	
	            /* 사용자 유무 체크 */
	            case "01" :
	                loginTpCd = "20";
	                loginReturnMessage = MessageResolver.getMessage("login.fail");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM;
	                break;
	            /* 사용시작일자 체크 */
	            case "02" :
	                loginTpCd = "20";
	                loginReturnMessage = MessageResolver.getMessage("login.fail.useStrtDate.expire");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM;
	                break;
	            /* 사용종료일자 체크 */
	            case "03" :
	                loginTpCd = "20";
	                loginReturnMessage = MessageResolver.getMessage("login.fail.useEndDate.expire");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM;
	                break;
	            /* 로그인실패횟수 체크 */
	            case "04" :
	                loginTpCd = "20";
	                loginReturnMessage = MessageResolver.getMessage("login.fail.loginFailCnt");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM + "?pupYn=Y";
	                break;
	            /* 패스워드 초기화 */
	            case "05" :
	                loginReturnMessage = MessageResolver.getMessage("login.pw.init");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM + "?tpCd=" + loginValidator;
	                break;
	            /* 패스워드변경 */
	            case "06" :
	                loginReturnMessage = MessageResolver.getMessage("login.pw.change");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM + "?tpCd=" + loginValidator;
	                break;
	            /*3개월미사용 잠금확인*/
	            case "07" :
	                loginTpCd = "20";
	                loginReturnMessage = MessageResolver.getMessage("login.fail.3month.check");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM+ "?pupYn=Y";
	                break;
	            /*개인정보열람 권한 소유자 ip 제어*/
	            case "08" :
	                loginTpCd = "20";
	                loginReturnMessage = MessageResolver.getMessage("login.fail.personalInfoIp.check");
	                returnUrl = domainsConfig.get("baseUrl") + ACTION_LOGIN_FORM;
	                break;
	            /* 정상 */
	            default :
	                loginTpCd = "10";
	                break;
	        }
	        
	        //정상 로그인 성공
	        if("10".equals(loginTpCd)){
	            currentUser = new LoginRequest();
	            currentUser.copyFromPersistadminUser(searchedLoginUser);
	            currentUser.setLoginId(requestedLoggedinUser.getLoginId());
	            currentUser.setPassword(requestedLoggedinUser.getPassword());
	            currentUser.setRemoteAddr(SystemUtils.getRemoteIP());
	        }
	        
	        //로그인 로그
	        saveLoginLog(request, requestedLoggedinUser, loginTpCd);
	        
	        request.setAttribute("loginReturnMessage", loginReturnMessage);
	        request.setAttribute("returnUrl", returnUrl);
	        request.setAttribute("loginTpCd", loginTpCd);
	        
	        if(!"10".equals(loginTpCd)){
	        	throw new BadCredentialsException("login fail, login tp cd : "+ loginTpCd);
	        }
	        
        } catch (BadCredentialsException e) {
			throw e;
		} catch (Exception e) {
			throw new BadCredentialsException(e.getMessage());
		}
        return new UsernamePasswordAuthenticationToken(currentUser, "", Arrays.asList(new SimpleGrantedAuthority("ADMIN")));
	}
	
	/**
     * 로그인 validator
     * @param request
     * @param searchedLoginUser
     * @return
     * @throws Exception
     */
    public String loginvalidator(HttpServletRequest request, LoginResponse searchedLoginUser,
                                 @ModelAttribute @Valid LoginRequest requestedLoggedinUser) throws Exception {

        if (searchedLoginUser == null) {
            loginService.updateLoginFailCntAdd(requestedLoggedinUser);
            return "01";
        }
        int useStrtDt = 0;
        int useEndDt = 0;
        int today = Integer.parseInt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));

        String userIp = SystemUtils.getRemoteIP();

        if (null != searchedLoginUser.getUseStrtDt() && !"".equals(searchedLoginUser.getUseStrtDt())){
            useStrtDt = Integer.parseInt(searchedLoginUser.getUseStrtDt());
        }
        if (null != searchedLoginUser.getUseEndDt() && !"".equals(searchedLoginUser.getUseEndDt())){
             useEndDt = Integer.parseInt(searchedLoginUser.getUseEndDt());
        }
        if (useStrtDt > 0 && today < useStrtDt) {
            return "02";
        }
        if (useEndDt > 0 && today > useEndDt) {
            return "03";
        }
        int loginFailCnt = Integer.parseInt(EnvironmentsConfig.getStatically("loginFailCount"));
        if (searchedLoginUser.getPwdCntnFailCnt() >= loginFailCnt){
            return "04";
        }
        if(BaseConstants.Y.equals(searchedLoginUser.getPwdIniYn())){
            return "05";
        }
        if(BaseConstants.Y.equals(searchedLoginUser.getPasswordChangeYn())){
            return "06";
        }
        /*    3개월미사용 잠금확인 : 07: */
        if(BaseConstants.Y.equals(searchedLoginUser.getPwdLockYn())){
            return "07";
        }
        /*    개인정보열람 권한 소유자 ip 제어 : 08 */
        /*TODO 확인필요. BO 사용자관리에서 개인정보 취급자의경우 IP를 입력받아서 체크필요. 팀장님 확인받음 추후
         * */
        //if(BaseConstants.Y.equals(searchedLoginUser.getIndInfoDealYn())){
        //    if(null == searchedLoginUser.getLastLoginIpAddr()) {
        //    	log.debug("last login ip addr null");
        //        return "08";
        //    } else if(!userIp.equals(searchedLoginUser.getLastLoginIpAddr())) {
        //    	log.debug("last login ip , user ip not equals");
        //        return "08";
        //    }
        //}

        return "00";
    }
    
    public void saveLoginLog(HttpServletRequest request, LoginRequest searchedLoginUser, String loginTpCd) throws Exception {
        StLoginLog stLoginLog = new StLoginLog();

        stLoginLog.setLoginIpAddr(SystemUtils.getRemoteIP());
        stLoginLog.setSysGbCd("11"); // 백오피스
        stLoginLog.setUserId(searchedLoginUser.getLoginId());
        stLoginLog.setLoginDtm(LocalDateTime.now());
        stLoginLog.setSysRegId(searchedLoginUser.getLoginId());
        stLoginLog.setSysModId(searchedLoginUser.getLoginId());

        loginService.insertStLoginLog(stLoginLog);
    }

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
