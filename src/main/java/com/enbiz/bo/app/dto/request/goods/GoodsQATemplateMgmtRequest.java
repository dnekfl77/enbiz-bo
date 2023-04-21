package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품Q&A 답변 템플릿 관리 Request DTO
 */
@Alias("GoodsQATemplateMgmtRequest")
@Getter
@Setter
public class GoodsQATemplateMgmtRequest extends BaseCommonEntity {

    private String ansTmplNm       ; // 답변템플릿명
    private String ansTmplRegId    ; // 답변템플릿등록자ID

}
