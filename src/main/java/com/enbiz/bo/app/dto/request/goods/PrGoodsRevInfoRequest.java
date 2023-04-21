package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrGoodsRevInfoRequest")
@Getter
@Setter
public class PrGoodsRevInfoRequest extends BaseCommonEntity {

    // 전시대상 상품리뷰 팝업 검색조건
    private String startDate    ; // 작성시작일시
    private String endDate      ; // 작성종료일시
    private String mdId         ; // 담당MD
    private String revScrVal    ; // 평가점수
    private String goodsNm      ; // 상품명
    private String loginId      ; // 회원ID
    private String mbrNm        ; // 회원명
}
