package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrMkdpDivobjInfo")
@Getter
@Setter
public class PrMkdpDivobjInfo extends BaseCommonEntity {

    private String mkdpNo;				// 기획전번호
    private String divobjNo;			// 구분자번호
    private String divobjNm;			// 구분자명
    private String dispYn;				// 전시여부
    private Integer dispSeq;			// 전시순서
    private String tmplNo;				// 템플릿 번호

}
