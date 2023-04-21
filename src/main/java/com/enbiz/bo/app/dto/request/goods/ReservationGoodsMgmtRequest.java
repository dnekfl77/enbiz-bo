package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 예약상품관리 Request DTO
 */
@Alias("ReservationGoodsMgmtRequest")
@Getter
@Setter
public class ReservationGoodsMgmtRequest extends BaseCommonEntity{
    private String startDate        ; // 시작날짜
    private String endDate          ; // 종료날짜
    private String entrNo           ; // 협력사
    private String userId           ; // 담당MD
    private String brandNo          ; // 브랜드번호
    private String saleStatCd       ; // 판매상태
    private String saleMethCd       ; // 판매방식
    private String goodsNo          ; // 상품번호
    private String goodsNm          ; // 상품명

    private String[] goodsNoList;
}
