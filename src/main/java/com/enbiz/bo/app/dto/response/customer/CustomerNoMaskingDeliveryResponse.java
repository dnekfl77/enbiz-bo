package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerNoMaskingDeliveryResponse")
@Getter
@Setter
public class CustomerNoMaskingDeliveryResponse {
    private	String mbrNo;	        //회원번호
    private	String mbrDlvpSeq;	    //회원배송지순번
    private	String dlvpNm;	        //배송지명
    private	String rcvmnNm;	        //수취인명
    private	String baseDlvpYn;	    //기본배송지여부
    private	String useYn;	        //사용여부
    private	Long userSortSeq;	    //사용자정렬순서
    private	Long zipNoSeq;	        //우편번호순번
    private	String zipNo;	        //우편번호
    private	String zipAddr;	        //우편주소
    private	String dtlAddr;	        //상세주소
    private	String telRgnNo;	    //전화지역번호
    private	String telTxnoNo;	    //전화국번번호
    private	String telEndNo;	    //전화끝번호
    private	String cellSctNo;	    //휴대폰구분번호
    private	String cellTxnoNo;	    //휴대폰국번번호
    private	String cellEndNo;	    //휴대폰끝번호
    private String telNo;           //전화번호
    private String cellNo;          //휴대폰번호
}
