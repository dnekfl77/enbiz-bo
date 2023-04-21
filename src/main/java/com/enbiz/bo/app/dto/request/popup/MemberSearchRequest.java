package com.enbiz.bo.app.dto.request.popup;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("MemberSearchRequest")
@Getter
@Setter
public class MemberSearchRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    private String argSelectType;       // 선택구분 ( 1 : 단일 , N : 다중 )
    private String argMbrStatCd;        // 회원상태 값

    //===============[Query Argument]===============//
    private	String loginId;	    //로그인아이디 - 회원아이디
    private	String mbrNm;	    //회원명
    private	String contactNo;	    //전화번호
    private String afterNoYn;   //뒤4자리검색 YN
    private	String mbrGradeCd;	//회원등급코드(ME024)
    private	String emailAddr;	//이메일주소
    private	String mbrStatCd;	//회원상태코드(ME003)

}
