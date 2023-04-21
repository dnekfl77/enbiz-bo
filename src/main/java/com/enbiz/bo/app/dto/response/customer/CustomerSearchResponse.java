package com.enbiz.bo.app.dto.response.customer;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerSearchResponse")
@Getter
@Setter
public class CustomerSearchResponse extends BaseCommonEntity {
    private	String mbrNo;	            //회원번호
    @MaskString(type = MaskingType.NAME_KR)
    private	String mbrNm;	            //회원명
    @MaskString(type = MaskingType.ID)
    private	String loginId;	            //로그인아이디 = 회원ID 21.04.08
    private	String mbrMgrCd;	        //회원관리코드(ME002) - 회원분류 용어 변경 21.04.08
    private	String mbrStatCd;	        //회원상태코드(ME003)
    private	String mbrGradeCd;	        //회원등급코드(ME024)
    private	String telRgnNo;	        //전화지역번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private	String telTxnoNo;	        //전화국번번호
    private	String telEndNo;	        //전화끝번호
    private	String cellSctNo;	        //휴대폰구분번호
    @MaskString(type = MaskingType.MOBILE_NUM)
    private	String cellTxnoNo;	        //휴대폰국번번호
    private	String cellEndNo;	        //휴대폰끝번호
    @MaskString(type = MaskingType.EMAIL)
    private	String emailAddr;	        //이메일주소
    private	Long zipNoSeq;	            //우편번호순번
    private	String zipNo;	            //우편번호
    @MaskString(type = MaskingType.ADDRESS)
    private	String zipAddr;	            //우편주소
    @MaskString(type = MaskingType.ADDRESS_DTL)
    private	String dtlAddr;	            //상세주소
    private	String siteNo;	            //가입사이트번호

    //코드명칭 조회 function으로 쿼리에서 만들어지는 컬럼!!
    private	String mbrMgrNm;	        //회원관리명(ME002) - 회원분류 용어 변경 21.04.08
    private	String mbrStatNm;	        //회원상태명(ME003)
    private	String mbrGradeNm;	        //회원등급명(ME024)
    @MaskString(type = MaskingType.MOBILE_NUM)
    private	String cellNo;	            //휴대폰번호
    @MaskString(type = MaskingType.PHONE_NUM)
    private	String telNo;	            //전화번호
    private	String address;	            //주소

}
