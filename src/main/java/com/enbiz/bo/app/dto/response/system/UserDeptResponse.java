package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 사용자조직관리 Response DTO
 * ==========================
 */
@Alias("UserDeptResponse")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDeptResponse extends BaseCommonEntity {
	private static final long serialVersionUID = 1L;

	private String deptCd;			// 부서코드 varchar(15) NOT NULL
	private String deptNm;			// 부서명 varchar(300) NOT NULL
	private String sortSeq;			// 정렬순서 numeric(5) NOT NULL
	private String useYn;			// 사용여부 varchar(1) NOT NULL
	private String uprDeptCd; 		// 상위부서코드 varchar(15) NULL
	private String jobGrpCd; 		// 상위부서코드 varchar(15) NULL
	private String sysRegId;		// 시스템등록자ID varchar(30) NOT NULL
	private String sysRegDtm; 		// 시스템등록일시 timestamp NOT NULL
	private String sysModId;		// 시스템수정자ID varchar(30) NOT NULL
	private String sysModDtm; 		// 시스템수정일시 timestamp NOT NULL
	private String userId;			//부서에 매핑된 유저아이디

	private String level;			//레벨
    private String hierarchy;		//계층구조
    private String hierarchyText;	//ex) 색조화장품>베이스 메이크업
}
