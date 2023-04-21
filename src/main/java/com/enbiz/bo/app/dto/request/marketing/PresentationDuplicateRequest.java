package com.enbiz.bo.app.dto.request.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PresentationDuplicateRequest")
@Getter
@Setter
public class PresentationDuplicateRequest extends BaseCommonEntity {
    private String goodsNo;     //상품번호
    private String aplyStrDt;   //적용시작일자
    private String aplyEndDt;   //적용종료일자
}
