package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StHoliInfo")
@Getter
@Setter
public class StHoliInfo extends BaseCommonEntity {

    private	String	holiDt         ; // 휴일일자
    private	String	holiJobGbCd    ; // 휴일업무구분코드(CM001)
    private	String	holiGbCd       ; // 휴일구분코드(CM002)
    private	String	holiMemo       ; // 휴일메모
    private	String	useYn          ; // 사용여부
}
