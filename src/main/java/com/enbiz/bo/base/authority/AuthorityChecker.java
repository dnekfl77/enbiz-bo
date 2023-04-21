package com.enbiz.bo.base.authority;

import com.enbiz.bo.app.dto.request.login.LoginRequest;

public interface AuthorityChecker {
	boolean canAccess(LoginRequest etUsrBase, String uri, String queryParam) throws Exception;
}
