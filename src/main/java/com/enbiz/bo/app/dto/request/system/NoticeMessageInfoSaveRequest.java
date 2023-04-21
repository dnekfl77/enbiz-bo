package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("NoticeMessageInfoSaveRequest")
@Getter
@Setter
public class NoticeMessageInfoSaveRequest extends BaseCommonEntity {

    private	String	notiMsgSeq;
    private	String	siteNo;
    private	String	msgGbCd;
    private String  aplyStrDt;
    private String  aplyEndDt;
    private	String	baseNotiMethodCd;
    private	String	title;
    private	String	msg;
    private	String	useYn;
}
