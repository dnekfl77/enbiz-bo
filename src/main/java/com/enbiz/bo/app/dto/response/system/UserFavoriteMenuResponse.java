package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("UserFavoriteMenuResponse")
@Getter
@Setter
public class UserFavoriteMenuResponse extends BaseCommonDto {
    private	String	rtGrpNo;	//권한그룹번호
    private	String	rtTgtSeq;	//권한대상순번
    private	String	sysResDtm;	//등록일시
    private	Long	sortSeq;	//정렬순서
    private	String	rtTgtNm;	//메뉴명
    private	String	sysRegDtm;	//메뉴명
    private	String	useYn;	//사용여부
}