package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객상담처리정보
 */
@Alias("CsCcnProcInfo")
@Getter
@Setter
public class CsCcnProcInfo extends BaseCommonEntity{
    private String ccnNo;           //상담번호
    private String cnslProcSeq;     //상담처리순번
    private String obProcTypCd;     //OB처리유형코드(CS014)
    private String cnslProcDtm;     //상담처리일시
    private String cnslProcCont;    //상담처리내용
}
