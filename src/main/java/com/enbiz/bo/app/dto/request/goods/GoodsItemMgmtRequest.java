package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 단품관리 Request DTO
 */
@Alias("GoodsItemMgmtRequest")
@Getter
@Setter
public class GoodsItemMgmtRequest extends BaseCommonEntity {
    private String historyDtm;          // 이력테이블 날짜
    private String startDate;           // 상품등록일 FROM
    private String endDate;             // 상품등록일 TO
    private String stockCheck ;         // 재고수량 체크여부
    private Integer stkQty;             // 재고수량
    private String userId;              // 담당MD
    private String stdCtgNo;            // 표준분류
    private String soutNotiStdQtyCheck; // 품절 알림기준
    private String saleStatCd;          // 판매상태
    private String itmSaleStatCd;       // 단품판매상태
    private String deliProcTypCd;       // 배송처리유형
    private String entrNo;              // 협력사
    private String soutNotiYn;          // 품절알림여부
    private String goodsNo;             // 상품번호
    private String goodsNm;             // 상품명
}
