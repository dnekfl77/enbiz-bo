package com.enbiz.bo.app.enums;

public enum PR032 {
    CANT_SHIPPED("10","발송불가 자동품절처리"),
    STOCK_ZERO("11","재고수량 0 품절처리"),
    MANAGER("12","관리자 수동품절처리"),
    DELIVERY_DELAY("13","익일배송지연 자동품절처리"),
    GOODS("14","모든단품품절로 상품 품절처리"),
    RESERVATION_GOODS("15","예약상품 품절처리"),
    BUNDLE_GOODS("16","묶음상품 품절로 인한 품절");

    private final String cd;
    private final String cdNm;

    PR032(String cd,String cdNm){
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

