package com.enbiz.bo.app.dto.request.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerSearchRequest")
@Getter
@Setter
public class CustomerSearchRequest extends BaseCommonEntity {
    private String condxSysRegDtmStt;   //가입일자검색시작일, 등록검색시작일
    private String condxSysRegDtmEnd;   //가입일자검색종료일, 등록검색종료일
    private String condxSysRegDtmAll;   //가입일자전체기간여부
    private String condxMbrMgrCd;       //회원분류
    private String condxMbrStatCd;      //회원상태
    private String condxMbrOpt;         //찾을대상:회원아이디,회원명
    private String condxMbrValue;       //해당입력값
    private String condxCellNo;         //휴대폰번호
    private String condxTelNo;          //전화번호

    private String condxMgrGbCd;        //관리구분코드(ME019)
    private String condxMgrTypCd;       //관리유형코드(ME009)
    private String condxLoginId;          //회원아이디
    private String condxMbrNm;          //회원명
}
