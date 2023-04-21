package com.enbiz.bo.app.enums;

public enum PR014 {
    BRAND_LOGO("01","브랜드로고"),
    MEDIUM("02","중"),
    SMALL("03","소");

    private final String cd;
    private final String cdNm;

    PR014(String cd,String cdNm){
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
