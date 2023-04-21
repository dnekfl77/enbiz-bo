package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("UserFavoriteMenuRequest")
@Getter
@Setter
public class UserFavoriteMenuRequest extends BaseCommonDto {

	private	String	userId;	//사용자아이디
	private	String	rtGrpNo;	//권한그룹번호
	private	String	rtTgtSeq;	//권한대상순번
	private	Long	sortSeq;	//정렬순서
	private	String	rtTgtNm;	//메뉴명
	private	String	useYn;	//사용여부
}
