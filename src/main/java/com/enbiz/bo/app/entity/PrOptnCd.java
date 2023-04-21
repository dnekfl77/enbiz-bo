package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 옵션코드
 */
@Alias("PrOptnCd")
@Getter
@Setter
public class PrOptnCd extends BaseCommonEntity {

    private String optnCatNo      ; //   옵션분류번호
    private String optnNo         ; //   옵션번호
    private String optnNm         ; //   옵션명
    private Integer sortSeq       ; //   정렬순서
    private String useYn          ; //   사용여부

}
