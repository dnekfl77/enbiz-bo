package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 고객상담 처리담당자이력
 */
@Alias("CsCcnProcAempHist")
@Getter
@Setter
public class CsCcnProcAempHist extends BaseCommonEntity{
    private String ccnNo;       // 상담번호
    private String statChgDtm;  // 상태변경일시
    private String aempId;      // 담당자ID
}
