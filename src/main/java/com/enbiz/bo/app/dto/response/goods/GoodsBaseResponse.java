package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrGoodsBase;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품기본 Response
 */
@Getter
@Setter
@Alias("GoodsBaseResponse")
public class GoodsBaseResponse extends PrGoodsBase {

    private String entrNm                                                  ;    // 협력사명
    private String brandNm                                                 ;    // 브랜드명
    private String stdCtgHierarchy                                         ;    // 표준분류하이라키구조
    private String mdId                                                    ;    // MD아이디
    private String goodsNotiLisartCd                                       ;    // 상품고시품목코드
    private String safeCertiNeedYn                                         ;    // 안전인증필요여부(표준카테고리)
}
