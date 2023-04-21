package com.enbiz.bo.app.dto.request.system;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest {

    private String userId;
    private String currentPasswd;
    private String newPasswd;
}
