package com.enbiz.bo.app.dto.response.system;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("NoticeMessageInfoResponse")
@Getter
@Setter
public class NoticeMessageInfoResponse extends BaseCommonDto {

    private	String	notiMsgSeq;
    private	String	siteNo;
    private	String	msgGbCd;
    private	String	msgGbNm;
    private String  aplyStrDt;
    private String  aplyEndDt;
    private	String	baseNotiMethodCd;
    private	String	baseNotiMethodNm;
    private	String	title;
    private	String	msg;
    private	String	useYn;
    private String  stateCd;

    public void setAplyEndDt(String aplyEndDt) {
        this.aplyEndDt = aplyEndDt;
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.stateCd = today.compareTo(this.getAplyEndDt()) > 0 ? "PAST" :
                today.compareTo(this.getAplyStrDt()) < 0 ? "PLAN" : "ONGOING";
    }
}
