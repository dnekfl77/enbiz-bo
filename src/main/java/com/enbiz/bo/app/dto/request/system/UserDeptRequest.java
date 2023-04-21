package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 사용자조직관리 Request DTO
 * ==========================
 */
@Getter
@Setter
@Alias("UserDeptRequest")
public class UserDeptRequest extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;

	private String deptCd;			// 부서코드 varchar(15) NOT NULL
	private String deptNm;			// 부서명 varchar(300) NOT NULL
	private String sortSeq;			// 정렬순서 numeric(5) NOT NULL
	private String useYn;			// 사용여부 varchar(1) NOT NULL
	private String uprDeptCd; 		// 상위부서코드 varchar(15) NULL
	private String jobGrpCd;		//업무그룹코드 varchar(10) NULL
	private String sysRegId;		// 시스템등록자ID varchar(30) NOT NULL
	private String sysRegDtm; 		// 시스템등록일시 timestamp NOT NULL
	private String sysModId;		// 시스템수정자ID varchar(30) NOT NULL
	private String sysModDtm; 		// 시스템수정일시 timestamp NOT NULL
}
