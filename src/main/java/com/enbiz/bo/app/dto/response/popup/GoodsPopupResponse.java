package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 상품 조회 팝업 Response Dto
 * ==========================
 */
@Alias("GoodsPopupResponse")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsPopupResponse extends BaseCommonEntity {
    private String goodsNo                         ;    //  상품번호
    private String goodsNm 	                       ;    //  상품명
    private String entrNm                          ;    //  협력사명
    private String brandNm                         ;    //  브랜드명
    private String modlNm		                   ;    //  모델명
    private String goodsCompCdNm                   ;    // 	상품구성코드명
    private String goodsTypCdNm	                   ;    //  상품유형코드명
    private String saleMethCdNm	                   ;    //  판매방식코드명
    private String saleStatCd                      ;    // 	판매상태코드
    private String saleStatCdNm                    ;    // 	판매상태코드명
    private String buyTypCdNm	                   ;    //  매입형태코드명
    private String deliProcTypCdNm                 ;    //  배송처리유형코드명
    private String deliWayCdNm	                   ;    //  배송수단코드명
    private String goodsRegDtm	                   ;    //  상품등록일시
    private String mdNm                            ;    //  담당MD명
}
