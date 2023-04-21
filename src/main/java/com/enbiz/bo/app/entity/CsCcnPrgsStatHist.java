package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객상담 진행상태이력
 */
@Alias("CsCcnPrgsStatHist")
@Getter
@Setter
public class CsCcnPrgsStatHist extends BaseCommonEntity{
    private String ccnNo;          //상담번호
    private String statChgDtm;     //상태변경일시
    private String ccnPrgsStatCd;  //고객상담진행상태코드(CS005)
}
