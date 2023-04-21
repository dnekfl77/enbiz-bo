package com.enbiz.bo.app.dto.login;

import java.util.Map;

/**
 * 현재 접속한 사용자 정보를 담고 있는  DTO 를 위한  인터페이스
 * @author sys4u
 *
 */
public interface CurrentUser {
    long getSeq();
    String getLoginId();
    String getName();
    String getRemoteAddr();
    long getLastAccessTime();
    Map<String, Object> getPermissionToViewPersonalInfo();
}
