package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객전화약속정보
 */
@Alias("CsCustTelPrmsInfo")
@Getter
@Setter
public class CsCustTelPrmsInfo extends BaseCommonEntity{
    private String ccnNo;          //상담번호
    private String cnslProcSeq;    //상담처리순번
    private String telPrmsSeq;     //전화약속순번
    private String prmsDtm;        //약속일시
    private String notiTmCd;       //알림시간코드(CS013)
    private String prmsMethCd;     //약속방식코드(CS008)
    private String prmsStatCd;     //약속상태코드(CS009)
    private String cnslMemo;       //상담메모
    private String aempId;         //담당자아이디
    private String aempConfDtm;    //담당자확인일시
    private String aempProcDtm;    //담당자처리일시
    private String telTryCnt;      //전화시도수
}
