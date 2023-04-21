package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("LoginLogRequest")
@Getter
@Setter
public class LoginLogRequest extends BaseCommonEntity {
	private String userId;
	private String sysGbCd;			//시스템구분코드(UR005)
	private String userIdConditionParam;
	private String userNmConditionParam;
}
