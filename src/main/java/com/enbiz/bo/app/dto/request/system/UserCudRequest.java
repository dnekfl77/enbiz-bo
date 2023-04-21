package com.enbiz.bo.app.dto.request.system;


import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCudRequest {
    @NotEmpty
    private	String userId;	                //사용자아이디
    @NotEmpty
    private	String userNm;	                //사용자명
    private	String pwd;	                    //비밀번호
    @NotEmpty
    private	String userGbCd;	            //사용자구분코드(UR001)
    @NotEmpty
    private	String rtGrpNo;	                //권한그룹번호
    @NotEmpty
    private	String jobGrpCd;	            //업무그룹코드(UR002)
    @NotEmpty
    private	String ocpCd;	            	//조직역할코드(UR003)
    @NotEmpty
    private	String workStatCd;	            //근무상태코드(UR004)

    private	String deptCd;	                //부서코드
    private	String telRgnNo;	            //전화지역번호
    private	String telTxnoNo;	            //전화국번번호
    private	String telEndNo;	            //전화끝번호
    @NotEmpty
    private	String cellSctNo;	            //휴대폰구분번호
    @NotEmpty
    private	String cellTxnoNo;	            //휴대폰국번번호
    @NotEmpty
    private	String cellEndNo;	            //휴대폰끝번호
    private	String cnslEntpNm;	            //상담업체명
    private	String ctiNo;	           	 	//CTI번호
    private	String itelNo;	                //내선번호
    @NotEmpty
    private	String emailAddr;	            //이메일주소
    @NotEmpty
    private	String indInfoDealYn;	        //개인정보취급여부
    @NotEmpty
    private	String useYn;	                //사용여부
}
