package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrAdveWrdHistCudRequest")
@Getter
@Setter
public class PrAdveWrdHistCudRequest extends BaseCommonEntity {
    private String aplyStrDt;           // 적용시작일자
    private String aplyEndDt;           // 적용종료일자
    private String adveWrd;            // 홍보문구
    private String goodsNo;             // 상품번호
    private String goodsNm;             // 상품명
    private String useYn;               // 사용여부
}
