package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.login.PrivacyPolicyInfo;

@Repository
@Lazy
public interface StIndInfoQryRtInfoMapper {

    List<PrivacyPolicyInfo> getStIndInfoQryRtInfoList(String userId);

}
