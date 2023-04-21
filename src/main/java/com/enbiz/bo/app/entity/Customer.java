package com.enbiz.bo.app.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("customer")
@Getter
@Setter
public class Customer extends BaseCommonEntity implements CurrentUser {
    private long customerId = Long.MIN_VALUE;
    private String mbrNo;
    private String mbrNm;

    private String loginId;
    private boolean loggedIn = false;
    private String remoteAddr;
    private long lastAccessTime;
    private List<Group> customerGroupNo = new ArrayList<Group>();

    @Override
    public long getSeq() {
        return customerId;
    }

    @Override
    public String getLoginId() { return loginId; }

    @Override
    public String getName() { return mbrNm; }

    @Override
    public String getRemoteAddr() { return remoteAddr; }

    @Override
    public long getLastAccessTime() { return lastAccessTime; }

    @Override
    public Map<String, Object> getPermissionToViewPersonalInfo() {
        return null;
    }

}
