package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 결제수단 제어관리 Request Dto
 * ==========================
 */

@Alias("OpPayMeanCtrlInfoRequest")
@Setter
@Getter
public class OpPayMeanCtrlInfoRequest extends BaseCommonEntity {
    private String argInsertUpdate	    ; 	// 등록,수정구분 코드
    private String ctrlGbCd	     ; 	// 제어구분코드
    private String ctrlTgtNo	 ; 	// 결제수단코드
    private String useYn	     ; 	// 사용여부
    private String state	     ; 	// 상태
    private String payMeanCtrlNo ; // 결제수단제어번호
}
