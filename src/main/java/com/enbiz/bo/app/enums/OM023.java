package com.enbiz.bo.app.enums;

/**
 * 환불정보
 */
public enum OM023 {
    ORDER_REFUND("10","주문환불"),
    COMPENS_REFUND("20","보상금환불"),
    DEPOSIT_REFUND("30","예치금환불");

    private final String cd;
    private final String cdNm;

    OM023(String cd, String cdNm){
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
