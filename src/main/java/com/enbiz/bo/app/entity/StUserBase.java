package com.enbiz.bo.app.entity;

import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StUserBase")
@Getter
@Setter
public class StUserBase extends BaseCommonEntity {
    private	String userId;					// 사용자아이디 varchar(30) NOT NULL
	private	String userGbCd;				// 사용자구분코드(UR001) varchar(10) NOT NULL
	private	String deptCd;					// 부서코드 varchar(15) NULL
	private	String entrNo;					// 협력사번호 varchar(15) NULL
	private	String userNm;					// 사용자명 varchar(100) NOT NULL
	private	String pwd;						// 비밀번호 varchar(200) NOT NULL
	private	String rtGrpNo;					// 권한그룹번호 varchar(15) NOT NULL
	private	String useYn;					// 사용여부 varchar(1) NOT NULL
	private	String telRgnNo;				// 전화지역번호 varchar(4) NULL
	private	String telTxnoNo;				// 전화국번번호 varchar(4) NULL
	private	String telEndNo;				// 전화끝번호 varchar(4) NULL
	private	String cellSctNo;				// 휴대폰구분번호 varchar(4) NOT NULL
	private	String cellTxnoNo;				// 휴대폰국번번호 varchar(4) NOT NULL
	private	String cellEndNo;				// 휴대폰끝번호 varchar(4) NOT NULL
	private	String emailAddr;				// 이메일주소 varchar(200) NOT NULL
	private	String indInfoDealYn;			// 개인정보취급여부 varchar(1) NOT NULL
	private	String jobGrpCd;				// 업무그룹코드(UR002) varchar(10) NOT NULL
	private	String ocpCd;					// 직책코드(UR003) varchar(10) Not Null
	private	String workStatCd;				// 근무상태코드(Ur004) varchar(10) Not Null
	private	String useStrtDt;				// 입사일자 varchar(8) Not Null
	private	String useEndDt;				// 퇴사일자 varchar(8) Not Null
	private	String cnslEntpNm;				// 상담업체명 varchar(200) Null
	private	String itelNo;					// 내선번호 varchar(20) Null
	private	String ctiNo;					// CTI번호 varchar(10) NULL
	private	LocalDateTime rcntUseDtm;		// 최근사용일시 timestamp NULL
	private	Long pwdCntnFailCnt;			// 비밀번호연속실패수 numeric(10) NOT NULL DEFAULT 0
	private	LocalDateTime lstPwdChgDtm;		// 최종비밀번호변경일시 timestamp NULL
	private	String pwdLockYn;				// 비밀번호잠김여부 varchar(1) NOT NULL
	private	String pwdIniYn;				// 비밀번호초기화여부 varchar(1) NOT NULL DEFAULT 'N'::character varying
	private	String sysRegId;				// 시스템등록자ID varchar(30) NOT NULL
	private	String sysRegDtm;				// 시스템등록일시 timestamp NOT NULL
	private	String sysModId;				// 시스템수정자ID varchar(30) NOT NULL
	private	String sysModDtm;				// 시스템수정일시 timestamp NOT NULL
	private String randomPasswd;			// 초기화된 비밀번호
}