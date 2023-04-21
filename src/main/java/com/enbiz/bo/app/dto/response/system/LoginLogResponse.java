package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("LoginLogResponse")
@Getter
@Setter
public class LoginLogResponse extends BaseCommonEntity {
	private String sysGbNm; 		// 시스템구분명
	private String userId;			//사용자아이디
	private String userNm;			//사용자명
	private String loginDtm;		//로그인일시
	private String pwdLockYn; 		// 잠김 여부
	private String loginIpAddr;		//로그인IP주소
	private String loutDtm;			//로그아웃일시
	private int loginCnt;			//로그인수
}
