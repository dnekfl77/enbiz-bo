package com.enbiz.bo.app.enums;

public enum PR007 {
    TAX("01", "과세"),
    DUTY_FREE("02", "면세"),
    ZERO_TAX("03", "영세");

    private final String cd;
    private final String cdNm;

    PR007(String cd, String cdNm){
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
