package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerDetailResponse")
@Getter
@Setter
public class CustomerDetailResponse {
    private	String mbrNo;	                //회원번호
    @MaskString(type = MaskingType.NAME_KR)
    private	String mbrNm;	                //회원명
    @MaskString(type = MaskingType.ID)
    private	String loginId;	                //로그인아이디 = 회원ID 21.04.08
//    private	String pwd;	                //비밀번호
//    private	String mbrGbCd;	            //회원구분코드(ME001)
    private	String mbrMgrCd;	            //회원관리코드(ME002) - 회원분류 용어 변경 21.04.08
//    private	String bmanNo;	            //사업자등록번호
    private	String corpnRpstmnNm;	        //법인대표자명
//    private	String corpnAempNm;	        //법인담당자명
//    private	String corpnAempDeptNm;	    //법인담당부서명
//    private	String corpnFaxNo;	        //법인팩스번호
    private	String empNo;	                //사원번호
    private	String deptNm;	                //부서명
    private	String entcmpDt;	            //입사일자
//    private	String resignDt;	        //퇴사일자
    private	String mbrStatCd;	            //회원상태코드(ME003)
//    private	String lgcMbrNo;	        //기간계회원번호
    private	String mbrGradeCd;	            //회원등급코드(ME024)
    private	String solarYn;	                //양력여부
    @MaskString(type = MaskingType.BIRTH)
    private	String brth;	                //생년월일
    private	String sexGbCd;	                //성별구분코드(ME017)
    private	String nafrGbCd;	            //내외국인구분코드(ME018)
    private	String telRgnNo;	            //전화지역번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private	String telTxnoNo;	            //전화국번번호
    private	String telEndNo;	            //전화끝번호
    private	String cellSctNo;	            //휴대폰구분번호
    @MaskString(type = MaskingType.MOBILE_NUM)
    private	String cellTxnoNo;	            //휴대폰국번번호
    private	String cellEndNo;	            //휴대폰끝번호
    @MaskString(type = MaskingType.EMAIL)
    private	String emailAddr;	            //이메일주소
    private	Long zipNoSeq;	                //우편번호순번
    private	String zipNo;	                //우편번호
    @MaskString(type = MaskingType.ADDRESS)
    private	String zipAddr;	                //우편주소
    @MaskString(type = MaskingType.ADDRESS_DTL)
    private	String dtlAddr;	                //상세주소
    private	String siteNo;	                //가입사이트번호
    private	String adlCertiYn;	            //성인인증여부
    private String adlCertiDtm;	            //성인인증일시
    private	String mbrJoinDtm;	            //회원가입일시
    private	String frstOrdDtm;	            //최초주문일시
    private	String lstOrdDtm;	            //최종주문일시
//    private	String frstLoginDtm;	    //최초로그인일시
    private String lstLoginDtm;	            //최종로그인일시
//    private	Long pwdErrCnt;	            //비빌번호오류횟수

    //코드명칭 조회 function으로 쿼리에서 만들어지는 컬럼!!
//    private	String mbrGbNm;	            //회원구분명(ME001)
    private	String mbrMgrNm;	            //회원관리명(ME002) - 회원분류 용어 변경 21.04.08
    private	String mbrStatNm;	            //회원상태명(ME003)
    private	String mbrGradeNm;	            //회원등급명(ME024)
    private	String sexGbNm;	                //성별구분명(ME017)
    private	String nafrGbNm;	            //내외국인구분명(ME018)
    @MaskString(type = MaskingType.MOBILE_NUM)
    private	String cellNo;	                //휴대폰번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private	String telNo;	                //전화번호
    @MaskString(type = MaskingType.ADDRESS_DTL)
    private	String address;	                //주소

    private String mbrWdraCausCd;           //탈퇴사유코드
    private String mbrWdraCausNm;           //탈퇴사유명
    @MaskString(type = MaskingType.EMAIL)
    private	String emailId;	                //이메일아이디
    private	String emailDomain;	            //이메일도메인
}
