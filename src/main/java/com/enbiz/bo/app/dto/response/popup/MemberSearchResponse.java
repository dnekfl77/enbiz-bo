package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("MemberSearchResponse")
@Getter
@Setter
public class MemberSearchResponse extends BaseCommonEntity {
    private	String	mbrNo;	//회원번호
    private	String	mbrNm;	//회원명
    private	String	loginId;	//로그인아이디
//    private	String	pwd;	//비밀번호
    private	String	mbrGbCd;	//회원구분코드(ME001)
    private	String	mbrMgrCd;	//회원관리코드(ME002)
//    private	String	bmanNo;	//사업자등록번호
//    private	String	corpnRpstmnNm;	//법인대표자명
//    private	String	corpnAempNm;	//법인담당자명
//    private	String	corpnAempDeptNm;	//법인담당부서명
//    private	String	corpnFaxNo;	//법인팩스번호
//    private	String	empNo;	//사원번호
//    private	String	deptNm;	//부서명
//    private	String	entcmpDt;	//입사일자
//    private	String	resignDt;	//퇴사일자
    private	String	mbrStatCd;	//회원상태코드(ME003)
//    private	String	lgcMbrNo;	//기간계회원번호
    private	String	mbrGradeCd;	//회원등급코드(ME024)
//    private	String	solarYn;	//양력여부
//    private	String	brth;	//생년월일
//    private	String	sexGbCd;	//성별구분코드(ME017)
//    private	String	nafrGbCd;	//내외국인구분코드(ME018)
    private	String	telRgnNo;	//전화지역번호
    private	String	telTxnoNo;	//전화국번번호
    private	String	telEndNo;	//전화끝번호
    private	String	cellSctNo;	//휴대폰구분번호
    private	String	cellTxnoNo;	//휴대폰국번번호
    private	String	cellEndNo;	//휴대폰끝번호
    private	String	emailAddr;	//이메일주소
    private	Long	zipNoSeq;	//우편번호순번
    private	String	zipNo;	//우편번호
    private	String	zipAddr;	//우편주소
    private	String	dtlAddr;	//상세주소
//    private	String	siteNo;	//가입사이트번호
//    private	String	adlCertiYn;	//성인인증여부
//    private	LocalDateTime	adlCertiDtm;	//성인인증일시
//    private	LocalDateTime	mbrJoinDtm;	//회원가입일시
//    private	LocalDateTime	frstOrdDtm;	//최초주문일시
//    private	LocalDateTime	lstOrdDtm;	//최종주문일시
//    private	LocalDateTime	frstLoginDtm;	//최초로그인일시
//    private	LocalDateTime	lstLoginDtm;	//최종로그인일시
//    private	Long	pwdErrCnt;	//비빌번호오류횟수
    
    private String mbrGbNm;         //회원구분코드(ME001)명
    private String mbrMgrNm;        //회원관리코드(ME002)명
    private String mbrStatNm;       //회원상태코드(ME003)명
    private String mbrGradeNm;      //회원등급코드(ME024)명
    private String sexGbNm;         //성별구분코드(ME017)명
    private String nafrGbNm;        //내외국인구분코드(ME018)명
    private String cellNo;          //cellSctNo + '-' + cellTxnoNo + '-' + cellEndNo
    private String telNo;           //telRgnNo + '-' + telTxnoNo + '-' + telEndNo
}
