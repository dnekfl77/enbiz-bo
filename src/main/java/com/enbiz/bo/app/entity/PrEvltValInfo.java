package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 평가값정보
 */
@Alias("PrEvltValInfo")
@Getter
@Setter
public class PrEvltValInfo extends BaseCommonEntity{

    private String evltItemNo    ; // 평가항목번호
    private String evltValNo     ; // 평가값번호
    private String evltVal       ; // 평가값
    private Integer sortSeq      ; // 정렬순서

}
