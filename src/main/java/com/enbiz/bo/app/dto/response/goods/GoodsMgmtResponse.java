package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품관리 Response
 */
@Alias("GoodsMgmtResponse")
@Getter
@Setter
public class GoodsMgmtResponse extends BaseCommonEntity {

    private String goodsCompCd;
    private String goodsCompCdNm;
    private String goodsTypCdNm;
    private String goodsNo;
    private String goodsNm;
    private String modlNm;
    private String brandNm;
    private String saleStatCdNm;
    private String saleMethCdNm;
    private String taxGbCdNm;
    private String buyTypCdNm;
    private Integer norPrc;
    private Integer salePrc;
    private Float mrgnRate;
    private String prcCompaExpYn;
    private String dispYn;
    private String itmSoutNotiYn;
    private String entrNm;
    private String mdNm;
    private String stdCtgHierarchy;
    private String deliProcTypCdNm;
    private String deliGoodsGbCdNm;
    private String goodsRegDtm;
    private String saleStrDtm;
    private String saleEndDtm;

}