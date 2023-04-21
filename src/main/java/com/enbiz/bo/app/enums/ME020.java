package com.enbiz.bo.app.enums;

public enum ME020 {
    ACTIVITY_POINT("11","활동포인트"),
    PRODUCT_REVIEW("31","상품리뷰"),
    EVENT_ACCUM("32","이벤트적립"),
    PROMOTION_ACCUM("33","프로모션적립"),
    CONVERSION_ACTIVITY_POINTS("34","활동포인트전환"),
    ORDER_ACCUM("35","주문적립"),
    ORDER_CHANGE_ACCUM("36","주문변경적립"),
    ETC("37","플러스조정(기타사유)"),
    CUSTOMER_CP_RESERVES("41","고객보상-적립금"),
    CUSTOMER_CP_DEPOSIT("42","고객보상-예치금"),
    CUSTOMER_REFUND("51","고객환불");

    private final String cd;
    private final String cdNm;

    ME020(String cd,String cdNm){
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
