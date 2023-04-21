package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품관리 Request
 */
@Alias("GoodsMgmtRequest")
@Getter
@Setter
public class GoodsMgmtRequest extends BaseCommonEntity {

    private String goodsRegStartDtm;
    private String goodsRegEndDtm;
    private String mdId;
    private String saleStatCd;
    private String entrNo;
    private String stdCtgNo;
    private String brandNo;
    private String goodsCompCd;
    private String goodsTypCd;
    private String saleMethCd;
    private String buyTypCd;
    private String itmSoutNotiYn;
    private String stkMgrYn;
    private String deliProcTypCd;
    private String deliGoodsGbCd;
    private String[] goodsNoList;
    private String goodsNm;

}
