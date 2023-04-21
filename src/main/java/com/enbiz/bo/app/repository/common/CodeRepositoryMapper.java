package com.enbiz.bo.app.repository.common;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.response.AuthorityAccessResponse;

@Repository
@Lazy
public interface CodeRepositoryMapper {
    List<AuthorityAccessResponse> getButtonByPageRoleList(LoginRequest loginRequest) throws Exception;
}
