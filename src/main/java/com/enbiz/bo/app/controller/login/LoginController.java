package com.enbiz.bo.app.controller.login;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.constant.Constants;
import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.login.LoginFormRequest;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;
import com.enbiz.bo.app.dto.response.login.LoginResponse;
import com.enbiz.bo.app.entity.SmsMsg;
import com.enbiz.bo.app.entity.StLoginLog;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.login.LoginService;
import com.enbiz.bo.base.annotation.SkipAuthorityCheck;
import com.enbiz.bo.base.properties.EnvironmentsConfig;
import com.enbiz.common.base.constant.BaseConstants;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.SystemUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.JSONObject;

@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class LoginController extends BaseController {
    private static final String BASE_URL = "baseUrl";
    private static final String ACTION_LOGIN_FORM = "loginForm.do";

    @Autowired
    private LoginService loginService;


    @Autowired
    private AdminCommonService adminCommonService;

    @Autowired
	private PasswordEncoder passwordEncoder;

    @RequestMapping("redirect.do")
    public String redirect(String url, String message, Model model) {
    	Map<String, String> result = new HashMap<>();

    	result.put("loginReturnMessage", message);
        result.put("returnUrl", url);

        model.addAttribute("result",result);

    	return "views/common/redirect";
    }

    @RequestMapping(ACTION_LOGIN_FORM)
    public String showLoginPage(@ModelAttribute LoginFormRequest loginFormRequest,
    		@AuthenticationPrincipal CurrentUser currentUser, Model model, HttpServletRequest request) throws Exception {

        // 정상 로그인이 아닌경우 세션 정보를 clear 하고 나머지 사항 진행함!!
        if (!StringUtils.equals("10", loginFormRequest.getTpCd())) {
            if (currentUser != null) {
                loginFormRequest.setLoginId(currentUser.getLoginId());
                model.addAttribute("loginFormRequest", loginFormRequest);
            }
        } else {
        	if (currentUser != null) {
        		return "redirect:/main.do";
        	}
        }

        return "views/login/loginForm";
    }

    @RequestMapping(method = RequestMethod.POST, value = "system/passwordInit.do")
    @ResponseBody
    public Object passwordInitialize(@AuthenticationPrincipal CurrentUser currentUser,
                               @ModelAttribute @Valid LoginRequest loginRequest, BindingResult bindingResult) throws Exception {

        JSONObject object = new JSONObject();
        String message = MessageResolver.getMessage("userMgmt.alert.user.password.init.success");

        try {
            log.debug(" loginId=[{}]", loginRequest.getLoginId());

            LoginResponse loginResponse = loginService.getUserCertification(loginRequest);

            if(loginResponse == null){
                message = MessageResolver.getMessage("userMgmt.alert.user.password.init.fail");
                object.put("message", message);
                object.put("resultType", BaseConstants.N);
            }else{
                loginRequest.copyFromPersistadminUser(loginResponse);

                Random rnd =new Random();
                StringBuffer rdStr =new StringBuffer();

                String[] chars = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
                for (int i=0;i<5;i++){
                    rdStr.append(chars[rnd.nextInt(chars.length)]);
                }
                rdStr.append(rnd.nextInt(10));
                rdStr.append(rnd.nextInt(10));
                rdStr.append(rnd.nextInt(10));
                String[] spChars = "!,@,#,$".split(",");
                for (int i=0;i<2;i++){
                    rdStr.append(spChars[rnd.nextInt(spChars.length)]);
                }
                String passwd = rdStr.toString();

                loginRequest.setPwdIniYn(BaseConstants.Y);
                loginRequest.setSysRegId(loginRequest.getLoginId());
                loginRequest.setUserId(loginRequest.getLoginId());
                String encryptedPassword = this.passwordEncoder.encode(passwd);
                loginRequest.setPwd(encryptedPassword);

                // 패스워드 초기화
//                personalMgmtService.saveChangePassword(loginRequest);

                loginService.updateIdUnlock(loginRequest);
                // SMS 발송
                sendInitPassWordSms(loginRequest, passwd);

                message = MessageResolver.getMessage("userMgmt.alert.user.password.init.success");

                object.put("message", message);
                object.put("resultType", BaseConstants.Y);
            }

        } catch (Exception e) {
            log.trace(e.getMessage(), e);
            object.put("message", MessageResolver.getMessage("adminCommon.message.fail"));
            object.put("resultType", BaseConstants.N);
        }

        return object;
    }

    /**
     * 초기화 패스워드 문자 발송
     * @param loginRequest
     * @return
     * @throws Exception
     */
    public void sendInitPassWordSms(LoginRequest loginRequest, String initPwStr) throws Exception {
        String cellNo = loginRequest.getCellSctNo()+ loginRequest.getCellTxnoNo()+ loginRequest.getCellEndNo();
        String msgStr  = "'"+ loginRequest.getName()+"'님의 임시비번 "+initPwStr+" 로그인후 비밀번호 변경하세요.(Admin)";

        SmsMsg smsMsg = new SmsMsg();
        smsMsg.setPhone(cellNo);
        //TODO cc_site_base 고객센터 전화번호 필드 조합 시키기
        smsMsg.setCallback(Constants.CC_CALLBACK_NUMBER);
        smsMsg.setMsg(msgStr);
        adminCommonService.insertInitPassWordSms(smsMsg);
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
        int today = Integer.parseInt(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));

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
        /*    개인정보열람 권한 소유자 ip 제어 : 08 , TODO 다시확인필요*/
        //if(BaseConstants.Y.equals(searchedLoginUser.getIndInfoDealYn())){
        //    if(null == searchedLoginUser.getLastLoginIpAddr()) {
        //        return "08";
        //    } else if(!userIp.equals(searchedLoginUser.getLastLoginIpAddr())) {
        //        log.trace("User IP does not match");
        //        return "08";
        //    }
        //}

        return "00";
    }

    /**
     * 로그인 성공, 실패 로그 저장
     * @param request
     * @param searchedLoginUser
     * @param loginTpCd
     * @throws Exception
     */
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

    @RequestMapping(value = "returnLoginForm.do")
    @SkipAuthorityCheck
    public String returnLoginForm(HttpServletRequest request, HttpServletResponse response
                ,@AuthenticationPrincipal CurrentUser currentUser) throws Exception {
    	SecurityContextHolder.clearContext();
        return "views/login/loginForm";
    }

    @PostMapping("/system/updatePasswordByPasswordInitialize.do")
    @ResponseBody
    public JSONResponseEntity passwdChange(@AuthenticationPrincipal CurrentUser currentUser, @Valid PasswordChangeRequest request) throws Exception {
        String loginId = currentUser.getLoginId();
        request.setUserId(loginId);
        loginService.updatePasswordByPasswordInitialize(request);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.changePassword.message.passwd.update.success"));
    }

}
