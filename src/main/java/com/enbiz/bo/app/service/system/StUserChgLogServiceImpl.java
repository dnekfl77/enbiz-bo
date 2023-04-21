package com.enbiz.bo.app.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.entity.StUserChgLog;
import com.enbiz.bo.app.enums.UR011;
import com.enbiz.bo.app.repository.system.StUserChgLogMapper;
import com.enbiz.bo.app.repository.system.StUserChgLogTrxMapper;
import com.enbiz.common.base.util.SystemUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 공통
 *
 * @author 
 *
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class StUserChgLogServiceImpl implements StUserChgLogService {
    
    @Autowired
    private StUserChgLogTrxMapper stUserChgLogTrxMapper;
    @Autowired
    private StUserChgLogMapper stUserChgLogMapper;
    
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveStUsrChgLog(StUserChgLog stUserChgLog) throws Exception {
        stUserChgLogTrxMapper.saveStUserChgLog(stUserChgLog);
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int getStUserChgLogPwdChgCnt(LoginRequest loginRequest) throws Exception {
        return stUserChgLogMapper.getStUserChgLogPwdChgCnt(loginRequest);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void savePasswdChgLog(String userId, String beforePasswd) throws Exception {
        StUserChgLog userChgLog = getBaseStUserChgLog(userId, beforePasswd);
        userChgLog.setChgTgtTpCd(UR011.PASSWORD.getCd());
        saveStUsrChgLog(userChgLog);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveCreateUserLog(String userId) throws Exception {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sessionId = currentUser.getLoginId();
        StUserChgLog userChgLog = getBaseStUserChgLog(userId, sessionId);
        userChgLog.setChgTgtTpCd(UR011.ACCOUNT_CREATE.getCd());
        saveStUsrChgLog(userChgLog);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveRtGrpChangeLog(String userId, String beforeRtGrpNo) throws Exception {
        StUserChgLog userChgLog = getBaseStUserChgLog(userId, beforeRtGrpNo);
        userChgLog.setChgTgtTpCd(UR011.WORK_GROUP.getCd());
        saveStUsrChgLog(userChgLog);
    }

    private StUserChgLog getBaseStUserChgLog(String userId, String contents) {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sessionId = currentUser.getLoginId();
        StUserChgLog userChgLog = new StUserChgLog();
        userChgLog.setUserId(userId);
        userChgLog.setChgCont(contents);
        userChgLog.setSessId(sessionId);
        userChgLog.setSysRegId(sessionId);
        userChgLog.setUserIpAddr(SystemUtils.getRemoteIP());
        return userChgLog;
    }

}
