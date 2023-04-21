package com.enbiz.bo.app.dto.response.login;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private	String userId;	                //사용자아이디
    private	String userNm;	                //사용자명
    private	String pwd;	                    //비밀번호
    private	String userGbCd;	            //사용자구분코드(UR001)
    private	String userGbNm;	            //사용자구분명
    private	String rtGrpNo;	                //권한그룹번호
    private	String jobGrpCd;	            //업무그룹코드(UR002)
    private	String orgTypNm;	            //조직유형명
    private	String ocpCd;	            //직책코드(UR003)
    private	String ocpNm;	            //직책명
    private	String workStatCd;	            //근무상태코드(UR004)
    private	String workStatNm;	            //근무상태명
    private	String empNo;	                //사원번호
    private	String deptNm;	                //부서명
    private	String cellSctNo;	            //휴대폰구분번호
    private	String cellTxnoNo;	            //휴대폰국번번호
    private	String cellEndNo;	            //휴대폰끝번호
    private	String emailAddr;	            //이메일주소
    private	String indInfoDealYn;	        //개인정보취급여부
    private	String useStrtDt;	            //사용시작일자
    private	String useEndDt;	            //사용종료일자
    private LocalDateTime rcntUseDtm;	    //최근사용일시
    private	Long pwdCntnFailCnt;	        //비밀번호연속실패수
    private	LocalDateTime lstPwdChgDtm;	    //최종비밀번호변경일시
    private	String pwdLockYn;	            //비밀번호잠김여부
    private	String pwdIniYn;	            //비밀번호초기화여부
    private	String useYn;	                //사용여부
    private	String entrNo;	                //협력사번호
    private String passwordChangeYn;        //암호변경여부
    private String lastLoginIpAddr;         //최종사용IP주소
    private String sysGbCd;                 //시스템구분코드(UR005)

    private List<PrivacyPolicyInfo> privacyPolicyInfoList;     //개인정보조회권한정보

}
