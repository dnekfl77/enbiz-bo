package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 표준카테고리평가항목정보
 */
@Alias("PrStdCtgEvltItemInfo")
@Getter
@Setter
public class PrStdCtgEvltItemInfo extends BaseCommonEntity{

    private String stdCtgNo;         // 표준카테고리번호
    private String evltItemNo;       // 평가항목번호
    private Integer sortSeq;         // 정렬순서

}
