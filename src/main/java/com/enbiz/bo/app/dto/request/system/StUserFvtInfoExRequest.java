package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StUserFvtInfoExRequest")
@Getter
@Setter
public class StUserFvtInfoExRequest extends BaseCommonEntity {
    private	String	userId;	//사용자아이디
    private	String	useYn;	//사용여부
    private	String	rtTgtSeq;	//권한대상순번
    private	int	sortSeq;	//정렬순서
    private	String	rtGrpNo;	//권한그룹번호
}
