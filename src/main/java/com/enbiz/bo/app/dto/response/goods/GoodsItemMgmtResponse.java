package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 단품 관리 Response DTO
 */
@Alias("GoodsItemMgmtResponse")
@Getter
@Setter
public class GoodsItemMgmtResponse extends BaseCommonEntity {
    private String goodsNo;         // 상품번호
    private String goodsNm;         // 상품명
    private String saleStatCd;      // 상품 판매 상태
    private String saleStatNm;      // 상품 판매 상태명
    private String modlNm;          // 모델명
    private String entrNm;          // 협력사
    private String strCtg;          // 표준분류
    private String itmNo;           // 단품번호
    private String itmNm;           // 단품명
    private String stkMgrYn;        // 재고관리여부
    private String stkQty;          // 재고수량
    private String dispSeq;         // 전시순서
    private String itmSaleStatCd;   // 단품 판매상태 코드
    private String itmSaleStatNm;   // 단품 판매상태명
    private String soutNotiYn;      // 품절 알림
    private String soutNotiStdQty;  // 품절 알림 기준수량
    private String lgcItmNo;        // 기간계 단품번호
    private String soutCausCd;      // 품절 사유
    private String salePrc;         // 판매가
    private String histStrDtm;      // 품절 처리 일자
    private String deliProcTypCd;   // 배송처리 유형
    private String deliProcTypNm;   // 배송처리 유형명
    private String soldUserNm;      // 품절 처리자
    private String userNm;          // 담당 md
    private String sysModId;        // 수정자
    private String sysModDtm;       // 수정일시
    private String hiddenItmSaleStatCd;   // 단품 판매상태 코드
}
