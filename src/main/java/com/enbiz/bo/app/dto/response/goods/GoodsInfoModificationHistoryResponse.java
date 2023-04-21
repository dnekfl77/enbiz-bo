package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품정보수정이력조회 Response DTO
 */
@Alias("GoodsInfoModificationHistoryResponse")
@Getter
@Setter
public class GoodsInfoModificationHistoryResponse extends BaseCommonEntity {

    private String goodsNo                ; // 상품번호
    private String goodsNm                ; // 상품명
    private String goodsModItemCdNm       ; // 상품수정항목코드명
    private String goodsModCont           ; // 상품수정내용

    private String entrNm                 ; // 협력사명
    private String saleStatCdNm           ; // 판매상태코드명
    private String safeCertiTgtYn         ; // 안전인증대상여부
    private String buyrAgeLmtCdNm         ; // 구입자나이제한코드명
    private String dispYn                 ; // 전시여부
    private String stkMgrYn               ; // 재고관리여부
    private String buyQtyLmtyn            ; // 구매수량제한여부
    private String minLmtQty              ; // 최소제한수량
    private String maxLmtQty              ; // 최대제한수량
    private String deliGoodsGbCdNm        ; // 최소제한수량
    private String itmSoutNotiYn          ; // 단품품절알림여부
    private String dispDlexAmt            ; // 배송정책
    private String prcCompaExpYn          ; // 가격비교노출여부

}
