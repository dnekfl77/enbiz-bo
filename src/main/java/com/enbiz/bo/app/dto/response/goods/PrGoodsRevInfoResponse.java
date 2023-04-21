package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrGoodsRevInfoResponse")
@Getter
@Setter
public class PrGoodsRevInfoResponse extends BaseCommonEntity {

    private String revNo          ; // 상품리뷰번호
    private String revCont        ; // 상품리뷰내용
    private Integer revScrVal     ; // 상품리뷰 점수
    private String revWrtDtm      ; // 작성일시
    private String goodsNo        ; // 상품번호
    private String goodsNm        ; // 상품명
    private String mdId           ; // 담당MD ID
    private String mdNm           ; // 담당MD명
    private String loginId        ; // 회원ID
    private String mbrNm          ; // 회원명
    private String salePrc        ; // 판매가

}
