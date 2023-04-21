package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsQADetailRequest")
@Getter
@Setter
public class GoodsQADetailRequest extends BaseCommonEntity {

    // 답변 저장
    private String questNo             ; // 질문번호
    private String ansSeq              ; // 답변순번
    private String ansCont             ; // 답변내용
    private String ansDispStatCd       ; // 답변전시상태코드(PR022)
    private String procStatCd          ; // 처리상태코드(PR039)

    // 질문 저장
    private String questDispStatCd     ; // 질문전시상태코드

    // 고객센터이관
    private String mvotCaus            ; // 이관사유

}
