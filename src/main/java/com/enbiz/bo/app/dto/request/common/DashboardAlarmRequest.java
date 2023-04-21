package com.enbiz.bo.app.dto.request.common;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("DashboardAlarmRequest")
@Getter
@Setter
public class DashboardAlarmRequest {
    private	String loginId;	            //회원아이디
}
