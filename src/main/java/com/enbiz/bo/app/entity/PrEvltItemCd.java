package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 평가항목코드
 */
@Alias("PrEvltItemCd")
@Getter
@Setter
public class PrEvltItemCd extends BaseCommonEntity{

    private String evltItemNo     ; //  평가항목번호
    private String evltItemNm     ; //  평가항목명
    private String useYn          ; //  사용여부

}
