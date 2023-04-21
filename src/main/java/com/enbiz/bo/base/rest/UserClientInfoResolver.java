package com.enbiz.bo.base.rest;

import java.util.Locale;
import java.util.Objects;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.common.base.rest.ClientInfo;
import com.enbiz.common.base.rest.ClientInfoResolver;

@Component
public class UserClientInfoResolver implements ClientInfoResolver {

	@Override
	public ClientInfo resolve() {
		ClientInfo clientInfo = new ClientInfo();
		LocaleContextHolder.getLocale();
		clientInfo.setDbLocaleLanguage(Objects.nonNull(LocaleContextHolder.getLocale()) ? LocaleContextHolder.getLocale().getLanguage() : Locale.getDefault().getLanguage());
//		clientInfo.setDbTimeZone(LocaleContextHolder.getTimeZone() != null ? LocaleContextHolder.getTimeZone().getID() : "UTC");
//		clientInfo.setJavaTimeZone(LocaleContextHolder.getTimeZone() != null ? LocaleContextHolder.getTimeZone().getID() : "UTC");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			clientInfo.setLoginId(((LoginRequest)authentication.getPrincipal()).getLoginId());
		}
		return clientInfo;
	}

}
