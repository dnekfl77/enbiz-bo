package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품QA답변정보
 */
@Alias("PrGoodsQaAnsInfo")
@Getter
@Setter
public class PrGoodsQaAnsInfo extends BaseCommonEntity{

    private String questNo             ; // 질문번호
    private String ansSeq              ; // 답변순번
    private String ansCont             ; // 답변내용
    private String ansDispStatCd       ; // 답변전시상태코드(PR022)
    private String ansDispProcDtm      ; // 답변전시처리일시
    private String ansDispProcmnId     ; // 답변전시처리자ID

}
