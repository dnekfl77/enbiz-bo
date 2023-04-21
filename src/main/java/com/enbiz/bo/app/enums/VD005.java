package com.enbiz.bo.app.enums;

/**
 * 배송비형태코드
 */
public enum VD005 {
    FREE("10","무료"),
    PAY("20","유료"),
    CONDITIONAL_FREE("30","조건부무료");

    private final String cd;
    private final String cdNm;

    VD005(String cd, String cdNm){
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
