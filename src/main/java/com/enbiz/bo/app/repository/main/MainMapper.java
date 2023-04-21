package com.enbiz.bo.app.repository.main;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.messaging.ReceiveMessage;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.menu.TopMenuResponse;

@Repository
@Mapper
public interface MainMapper {
    /**
     * TOP 메뉴 조회
     * @param loginRequest
     * @return
     * @throws Exception
     */
    List<TopMenuResponse> getTopMenuList(LoginRequest loginRequest) throws Exception;
    /**
     * LEFT 메뉴 조회
     * @param params
     * @return
     * @throws Exception
     */
    List<LeftMenuResponse> getLeftMenuList(TopMenuRequest params) throws Exception;
    /**
     * 알람메세지 조회
     * @param loginRequest
     * @return
     */
    ReceiveMessage getAlarmMessage(LoginRequest loginRequest);
}
