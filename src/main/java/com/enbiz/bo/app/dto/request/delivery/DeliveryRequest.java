package com.enbiz.bo.app.dto.request.delivery;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 배송조회 Request Dto
 * ==========================
 */

@Alias("DeliveryRequest")
@Setter
@Getter
public class DeliveryRequest extends BaseCommonEntity {

    private String searchDateType	; 	// 기간
    private String startDate	    ; 	// 시작기간
    private String endDate		    ; 	// 종료기간
    private String deliPrgsStatCd	; 	// 배송진행상태
    private String deliTypCd	    ; 	// 배송유형
    private String searchDeliInfoType    ; 	// 배송정보 구분
    private String ordNo    	    ; 	// 주문번호
    private String deliGoodsGbCd    ; 	// 배송상품구분
    private String deliProcTypCd    ; 	// 배송처리유형
    private String searchOrdManType ; 	// 주문자정보 구분
    private String ordManNm         ; 	// 주문자정보
    private String entrNo           ; 	// 협력사번호
    private String deliWayCd        ;   // 배송수단
    private String excelHeader      ; 	// 엑셀 헤더 리스트
    private String deliNo           ; 	// 배송번호

}
