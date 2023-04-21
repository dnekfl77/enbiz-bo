package com.enbiz.bo.app.dto.request.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginFormRequest {
    private String loginId;         // 사용자ID
    private String tpCd;            //로그인 타입코드
}
