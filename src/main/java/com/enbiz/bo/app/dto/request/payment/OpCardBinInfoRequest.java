package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 카드Bin관리 Request Dto
 * ==========================
 */

@Alias("OpCardBinInfoRequest")
@Setter
@Getter
public class OpCardBinInfoRequest extends BaseCommonEntity {
    private String startDate	    ; 	// 적용일자_시작날짜
    private String endDate	        ; 	// 적용일자_마지막날짜
    private String cardBinno	    ; 	// 카드Bin번호
    private String iscmCd	        ; 	// 발급사 코드
    private String cardcoNm         ;   // 카드명칭
    private String mbrGbCd          ;   // 회원구분 코드
}
