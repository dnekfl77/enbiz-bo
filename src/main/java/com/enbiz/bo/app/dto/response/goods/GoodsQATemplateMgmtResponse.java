package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품Q&A 답변 템플릿 관리 Response DTO
 */
@Alias("GoodsQATemplateMgmtResponse")
@Getter
@Setter
public class GoodsQATemplateMgmtResponse extends BaseCommonEntity {

    private String ansTmplNo       ; // 답변템플릿번호
    private String ansTmplNm       ; // 답변템플릿명
    private String ansTmplCont     ; // 답변템플릿내용
    private String useYn           ; // 사용여부

}
