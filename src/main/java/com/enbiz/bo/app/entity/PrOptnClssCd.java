package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 옵션분류코드
 */
@Alias("PrOptnClssCd")
@Getter
@Setter
public class PrOptnClssCd extends BaseCommonEntity {

    private String optnCatNo          ; //   옵션분류번호
    private String optnCatRegGbCd     ; //   옵션분류등록구분코드(PR018)
    private String entrNo             ; //   협력사번호
    private String optnCatTypCd       ; //   옵션분류유형코드(PR019)
    private String optnCatNm          ; //   옵션분류명
    private Integer sortSeq           ; //   정렬순서
    private String useYn              ; //   사용여부
}
