package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("EtWishList")
@Getter
@Setter
public class EtWishList extends BaseCommonEntity {
	private	String mbrNo;			//회원번호
	private	String goodsNo;		//상품번호
	private	String siteNo;		//사이트번호
	private	String dispCtgNo;	//전시카테고리번호
}
