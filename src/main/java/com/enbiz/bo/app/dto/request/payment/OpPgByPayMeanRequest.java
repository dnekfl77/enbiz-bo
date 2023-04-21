package com.enbiz.bo.app.dto.request.payment;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 결제수단관리 Request Dto
 * ==========================
 */

@Alias("OpPgByPayMeanRequest")
@Setter
@Getter
public class OpPgByPayMeanRequest extends BaseCommonEntity {
    private String pgGbCd	    ; 	// PG구분코드
}
