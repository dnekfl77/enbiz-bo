package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("NoticeMessageInfoRequest")
@Getter
@Setter
public class NoticeMessageInfoRequest extends BaseCommonDto {

    private	String	notiMsgSeq;
    @NotEmpty
    private	String	siteNo;
    @NotEmpty
    private	String	msgGbCd;
    @NotEmpty
    private String  aplyStrDt;
    @NotEmpty
    private String  aplyEndDt;
    @NotEmpty
    private	String	baseNotiMethodCd;
    @NotEmpty
    private	String	title;
    @NotEmpty
    private	String	msg;
    @NotEmpty
    private	String	useYn;
}
