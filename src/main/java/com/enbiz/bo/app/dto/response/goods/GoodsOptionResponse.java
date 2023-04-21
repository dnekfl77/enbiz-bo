package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품 옵션 Response
 */
@Getter
@Setter
@Alias("GoodsOptionResponse")
public class GoodsOptionResponse extends BaseCommonEntity {

    private String optnCatNo            ; //   옵션분류번호
    private String optnCatRegGbCdNm     ; //   옵션분류등록구분코드명
    private String optnCatNm            ; //   옵션분류명

    private String optnNo               ; //   옵션번호
    private String optnNm               ; //   옵션명


}
