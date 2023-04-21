package com.enbiz.bo.app.service.main;

import java.util.List;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.messaging.ReceiveMessage;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.menu.TopMenuResponse;

/**
 * 메인 서비스
 *
 */
public interface MainService {
	/**
	 * TOP 메뉴 조회
	 * @param loginRequest
	 * @return
	 * @throws Exception
	 */
	public List<TopMenuResponse> getTopMenuList(LoginRequest loginRequest) throws Exception;
	/**
	 * LEFT 메뉴 조회
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<LeftMenuResponse> getLeftMenuList(TopMenuRequest params) throws Exception;
	/**
	 * 알람 메시지 조회
	 * @param loginRequest
	 * @return
	 */
	public ReceiveMessage getAlarmMessage(LoginRequest loginRequest);
}
