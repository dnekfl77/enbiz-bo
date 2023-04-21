package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcNotiMsgInfo")
@Getter
@Setter
public class CcNotiMsgInfo extends BaseCommonEntity {

    private	String	notiMsgSeq;	//알림메시지 순번

    private	String	siteNo;	//사이트번호

    private	String	msgGbCd;	//메시지구분코드(CH008)

    private String aplyStrDt;

    private String aplyEndDt;

    private	String	baseNotiMethodCd;	//기본알림방법코드(CH009)

    private	String	title;

    private	String	msg;

    private	String	useYn;

}
