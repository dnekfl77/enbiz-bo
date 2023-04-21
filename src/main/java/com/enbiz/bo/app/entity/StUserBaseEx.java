package com.enbiz.bo.app.entity;

import java.util.Map;

import com.enbiz.bo.app.dto.login.CurrentUser;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StUserBaseEx extends StUserBase implements CurrentUser {

	private long id = -1L;
	private boolean loggedIn = false;
	private String remoteAddr;
	private long lastAccessTime;

	private String prsnInfoPuslYn;

	@Override
	public long getSeq() {
		return id;
	}

	@Override
	public String getLoginId() {
		return getUserId();
	}

	@Override
	public String getName() {
		return getUserNm();
	}

	@Override
	public Map<String, Object> getPermissionToViewPersonalInfo() {
		return null;
	}

}