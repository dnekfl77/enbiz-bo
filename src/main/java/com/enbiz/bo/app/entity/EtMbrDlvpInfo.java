package com.enbiz.bo.app.entity;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.Getter;
import lombok.Setter;

@Alias("EtMbrDlvpInfo")
@Getter
@Setter
public class EtMbrDlvpInfo extends BaseCommonEntity {
	private	String mbrNo;	        //회원번호
	private	String mbrDlvpSeq;	    //회원배송지순번
	private	String dlvpNm;	        //배송지명
	private	String rcvmnNm;	        //수취인명
	private	String baseDlvpYn;	    //기본배송지여부
	private	String useYn;	        //사용여부
	private	Integer userSortSeq;	    //사용자정렬순서
	private	Integer zipNoSeq;	    //우편번호순번
	private	String zipNo;	        //우편번호
	private	String zipAddr;	        //우편주소
	private	String dtlAddr;	        //상세주소
	private	String telRgnNo;	    //전화지역번호
	private	String telTxnoNo;	    //전화국번번호
	private	String telEndNo;	    //전화끝번호
	private	String cellSctNo;	    //휴대폰구분번호
	private	String cellTxnoNo;	    //휴대폰국번번호
	private	String cellEndNo;	    //휴대폰끝번호


	public Map<String,String> validation(){

		final Map<String,String> returnMap = new HashMap<>();
		String message = null;
		String result = "Y";

		if(StringUtils.isEmpty(this.mbrNo)){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.mbrNo");
			result = "N";
		}else if(StringUtils.isEmpty(this.dlvpNm)){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.dlvpNm");
			result = "N";
		}else if(StringUtils.isEmpty(this.rcvmnNm)){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.rcvmnNm");
			result = "N";
		}else if(StringUtils.isEmpty(this.baseDlvpYn)){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.baseDlvpYn");
			result = "N";
		}else if(StringUtils.isEmpty(this.useYn)){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.useYn");
			result = "N";
		}else if(this.userSortSeq == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.userSortSeq");
			result = "N";
		}else if(this.zipNoSeq == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.zipNoSeq");
			result = "N";
		}else if(this.zipNo == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.zipNo");
			result = "N";
		}else if(this.zipAddr == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.zipAddr");
			result = "N";
		}else if(this.dtlAddr == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.dtlAddr");
			result = "N";
		}else if(this.cellSctNo == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.cellSctNo");
			result = "N";
		}else if(this.cellTxnoNo == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.cellTxnoNo");
			result = "N";
		}else if(this.cellEndNo == null){
			message = MessageResolver.getMessage("etMbrDlvpInfo.validation.msg.cellEndNo");
			result = "N";
		}

		returnMap.put("msg",message);
		returnMap.put("result",result);
		return returnMap;
	}

}
