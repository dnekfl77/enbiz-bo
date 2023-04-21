package com.enbiz.bo.app.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.bo.app.repository.system.StUserBaseMapper;
import com.enbiz.bo.app.repository.system.StUserBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PasswordChangeServiceImpl implements PasswordChangeService{

    private final StUserBaseMapper stUserBaseMapper;
    private final StUserBaseTrxMapper stUserBaseTrxMapper;
    private final StUserChgLogService stUserChgLogService;
    
    @Autowired
	private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void changePassword(PasswordChangeRequest request) throws Exception {
        Validator.throwIfEmpty(request.getUserId()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.userId")}));
        Validator.throwIfEmpty(request.getNewPasswd()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.new.passwd")}));

        updatePassword(request.getUserId(), request.getNewPasswd());
        String encryptedCurrentPasswd = this.passwordEncoder.encode(request.getCurrentPasswd());
        stUserChgLogService.savePasswdChgLog(request.getUserId(), encryptedCurrentPasswd);
    }

    private void updatePassword(String userId, String passwd) throws Exception {
        String encryptedPasswd = this.passwordEncoder.encode(passwd);
        StUserBase userParam = new StUserBase();
        userParam.setUserId(userId);
        userParam.setPwd(encryptedPasswd);
        stUserBaseTrxMapper.updateChagePassword(userParam);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkCurrentPassword(PasswordChangeRequest request) throws Exception {
        Validator.throwIfEmpty(request.getUserId()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.userId")}));
        Validator.throwIfEmpty(request.getCurrentPasswd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.current.passwd")}));
        String encryptedCurrentPasswd = stUserBaseMapper.getPasswd(request.getUserId());
        if (passwordEncoder.matches(request.getCurrentPasswd(), encryptedCurrentPasswd)) {
        	return true;
        } else {
        	return false;
        }
    }

}
