package com.enbiz.bo.app.dto;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("MaskingCUD")
@Getter
@Setter
public class MaskingCUD {
	/*
     * 성명_한글: userNmKr
     * 성명_영문: userNmEn
     * 생년월일: 	userBirth
     * 전화번호: 	userPhoneNum
     * 핸드폰: 	userMobileNum
     * 주소: 	userAddress
     * 상세주소: 	userAddressDtl
     * IP: 		userIP
     * 이메일: 	userEmail
     * ID: 		userID
     * 계좌번호: 	userActn
	 * 카드번호: 	userCard
	 */
	@MaskString(type = MaskingType.NAME_KR)
    private String userNmKr;		// 성명_한글
	@MaskString(type = MaskingType.NAME_EN)
    private String userNmEn;		// 성명_영문
	@MaskString(type = MaskingType.BIRTH)
    private String userBirth;	// 생년월일
	@MaskString(type = MaskingType.RRN)
    private String userRrn;	// 주민번호
	@MaskString(type = MaskingType.PHONE_NUM)
    private String userPhoneNum;	// 전화번호
	@MaskString(type = MaskingType.MOBILE_NUM)
    private String userMobileNum;	// 핸드폰
	@MaskString(type = MaskingType.ADDRESS)
    private String userAddress;	// 주소
	@MaskString(type = MaskingType.ADDRESS_DTL)
    private String userAddressDtl;	// 상세주소
	@MaskString(type = MaskingType.IP)
    private String userIP;	// IP
	@MaskString(type = MaskingType.IP)
    private String userIP2;	// IP
	@MaskString(type = MaskingType.EMAIL)
    private String userEmail;	// 이메일
	@MaskString(type = MaskingType.ID)
    private String userID;	// ID
	@MaskString(type = MaskingType.ACTN)
    private String userActn;	// 계좌번호
	@MaskString(type = MaskingType.CARD)
	private String userCard;	// 카드번호
}
