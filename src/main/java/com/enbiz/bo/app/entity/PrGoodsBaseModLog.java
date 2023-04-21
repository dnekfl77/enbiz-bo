package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품기본수정로그
 */
@Alias("PrGoodsBaseModLog")
@Getter
@Setter
public class PrGoodsBaseModLog extends BaseCommonEntity {
    private String goodsChgSeq      ;    //  상품변경순번
    private String goodsNo 	        ;    //  상품번호
    private String goodsModItemCd   ;    //  상품수정항목코드(PR038)
    private String goodsModCont     ;    //  상품수정내용
    private String goodsModCausDesc ;    //  상품수정사유설명
}
