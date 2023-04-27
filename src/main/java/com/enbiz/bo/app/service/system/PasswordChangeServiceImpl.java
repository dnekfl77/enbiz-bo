package com.enbiz.bo.app.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.PasswordChangeRequest;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@RequiredArgsConstructor
public class PasswordChangeServiceImpl implements PasswordChangeService{

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    @Autowired
	private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void changePassword(PasswordChangeRequest request) throws Exception {
        Validator.throwIfEmpty(request.getUserId()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.userId")}));
        Validator.throwIfEmpty(request.getNewPasswd()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.new.passwd")}));

		restApiComponent.post(boApiUrl + "/api/bo/login/login/changePassword", request, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkCurrentPassword(PasswordChangeRequest request) throws Exception {
        Validator.throwIfEmpty(request.getUserId()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.userId")}));
        Validator.throwIfEmpty(request.getCurrentPasswd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("passwordChange.label.data.current.passwd")}));
        String encryptedCurrentPasswd = ""; // .getPasswd(request.getUserId());
        if (passwordEncoder.matches(request.getCurrentPasswd(), encryptedCurrentPasswd)) {
        	return true;
        } else {
        	return false;
        }
    }

}
