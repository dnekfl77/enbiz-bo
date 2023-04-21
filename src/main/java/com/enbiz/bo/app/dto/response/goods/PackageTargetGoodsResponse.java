package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 묶음 대상 상품 Response
 */
@Getter
@Setter
@Alias("PackageTargetGoodsResponse")
public class PackageTargetGoodsResponse extends BaseCommonEntity {

    private String goodsNo                  ;    //  상품번호
    private String goodsNm 	                ;    //  상품명
    private String modlNm		            ;    //  모델명
    private String brandNm                  ;    // 브랜드명
    private String entrNo 	                ;    //  협력사번호
    private String entrNm                   ;    // 협력사명
    private String mdId                     ;    // MD아이디
    private String saleStatCdNm             ;    // 판매상태명
    private String goodsRegDtm	            ;    //  상품등록일시
    private String dispYn      	            ;    //  전시여부
    private String deliProcTypCdNm          ;    // 배송처리유형명
    private String deliGoodsGbCdNm          ;    // 배송상품구분코드명
    private Integer salePrc                 ;    // 판매가
    private String dispDlexAmt              ;    // 배송비


}
