package com.enbiz.bo.app.service.common;

import com.enbiz.bo.app.dto.request.login.LoginRequest;

public interface AdminGroupService {
    int getAdminGroups(LoginRequest adminUser) throws Exception;
}
