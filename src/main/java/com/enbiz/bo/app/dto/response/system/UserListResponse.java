package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("UserListResponse")
@Getter
@Setter
public class UserListResponse extends BaseCommonEntity {
	private String userId;			// 사용자아이디 varchar(30) NOT NULL
	private String userNm;			// 사용자명 varchar(100) NOT NULL
	private String orgTypNm;		// 업무그룹코드(UR002) varchar(10) NOT NULL
	private String deptNm;			// 부서명 varchar(300) NOT NULL
	private String ocpNm;			// 직책코드(UR003)varchar(10) NOT NULL
	private String workStatNm;		// 근무상태코드(UR004) varchar(10) NOT NULL
	private String pwdLockYn;		// 비밀번호잠김여부 varchar(1) NOT NULL
	private String indInfoDealYn;	// 개인정보취급여부 varchar(1) NOT NULL
	private String sysModId;		// 시스템수정자ID varchar(30) NOT NULL
	private String sysModDtm;		// 시스템수정일시 timestamp NOT NULL
}
