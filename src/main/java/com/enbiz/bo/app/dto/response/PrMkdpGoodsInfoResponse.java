package com.enbiz.bo.app.dto.response;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrMkdpGoodsInfoResponse")
@Getter
@Setter
public class PrMkdpGoodsInfoResponse extends BaseCommonEntity {

	private String mkdpNo;
	private String divobjNo;
	private String goodsNo;
	private String goodsNm;
	private String dispSeq;
	private String saleStatCd;
	private String entrNm;
	private String norPrc;
	private String salePrc;
	private String sysReqDtm;

}