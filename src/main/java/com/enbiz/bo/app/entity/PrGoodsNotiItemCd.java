package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrGoodsNotiItemCd")
@Getter
@Setter
public class PrGoodsNotiItemCd extends BaseCommonEntity {

    private String goodsNotiItemCd              ; // 상품고시항목코드
    private String notiItemNm                   ; // 고시항목명
    private String notiItemDesc                 ; // 고시항목설명
    private String insrtMethCd                  ; // 입력방식코드(PR013)
    private String useYn                        ; // 사용여부

}
