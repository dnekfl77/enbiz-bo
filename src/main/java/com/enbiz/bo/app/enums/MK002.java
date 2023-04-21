package com.enbiz.bo.app.enums;

public enum MK002 {
    GOODS_DISCOUNT("11","상품할인쿠폰"),
    SHOPPING_BASEKET("12","장바구니쿠폰"),
    REDUNDANT_DISCOUNT("13","중복할인쿠폰"),
    FREE_DELIVERY("14","무료배송쿠폰"),
    FREE_RETURN("15","무료반품쿠폰"),
    EXECUTIVES("20","임직원할인"),
    CARD_COMPANY("30","카드사할인"),
    GOODS_SAVINGS("40","상품적립금");

    private final String cd;
    private final String cdNm;

    MK002(String cd,String cdNm){
        this.cd = cd;
        this.cdNm = cdNm;
    }

    public String getCd() {
        return cd;
    }

    public boolean isEquals(String cd){
        return cd.equals(this.getCd());
    }
}
