package com.enbiz.bo.app.enums.common;

/**
 * 주문공통 코드
 */
public enum OrderCommonCode {
    AGENT_ORDER_CHANNEL("1000110","상담주문채널"),
    AGENT_ORDER_SITE("01","상담주문사이트");

    private final String cd;
    private final String cdNm;

    OrderCommonCode(String cd, String cdNm){
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
