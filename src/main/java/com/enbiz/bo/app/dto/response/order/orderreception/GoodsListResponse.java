package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsListResponse")
@Getter
@Setter
public class GoodsListResponse extends BaseCommonEntity {

	private String stdLrgCtgNm;			// 표준대분류명
	private String stdMidCtgNm;			// 표준중분류명
	private String goodsNo;				// 상품번호
	private String goodsNm;				// 상품명
	private String optnNm;				// 단품명
	private String norPrc;				// 정상가
	private String salePrc;				// 판매가
	private Integer stkQty;				// 재고수량
	private String saleStatCdNm;		// 판매상태
	private String prestNm;				// 증정품명
	private String deliProcTypCdNm;		// 배송처리유형(PR008)
	private String dispCtgNm;			// 전시카테고리
	private String brandNm;				// 브랜드명
	private String entrNm;				// 협력사명

	//Hidden Colume
	private String dispCtgNo;			// 전시카테고리번호
	private String siteNo;				// 사이트번호
	private String stdCtgNo;			// 표준카테고리번호
	private String entrNo;				// 협력사번호
	private String brandNo;				// 브랜드번호
	private String itmNo;				// 단품번호
	private String buyQtyLmtYn;			// 구매수량제한여부
	private Integer minLmtQty;			// 최소제한수량
	private Integer maxLmtQty;			// 최대제한수량

	private String goodsTypCdNm;		// 상품유형코드(PR002)
	private String deliGoodsGbCdNm;		// 배송상품구분코드(PR010)
	private String deliWayCdNm;			// 배송수단코드명(PR009)
	private String deliWayCd;			// 배송수단코드(PR009)
	private String deliDday;			// 배송기일
	private String saleMethCdNm;		// 판매방식코드(PR003)
	private String fwdidcPrarDy;		// 출고지시예정일자
	private String buyTypCdNm;			// 거래형태(매입형태코드(PR006))
	private String bdlDeliPsbYn;		// 묶음배송가능여부
	private String deliPolcNo;			// 배송정책번호
	private String deliProcTypCd;		// 배송처리유형코드(PR008)
	private String selectYn;              // 선택불가능 ( 성인상품 ,상품판매상태 판매중 x )

}
