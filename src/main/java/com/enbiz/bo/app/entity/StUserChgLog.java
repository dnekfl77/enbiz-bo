package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("stUserChgLog")
@Getter
@Setter
public class StUserChgLog extends BaseCommonEntity {
    private	String	userId;	        //사용자아이디
    private	Long	histSeq;	    //이력순번
    private	String	sessId;	        //세션아이디
    private	String	userIpAddr;	    //사용자IP주소
    private	String	chgTgtTpCd;	    //변경대상유형코드(UR011)
    private	String	chgCont;	    //변경내용
}
