package com.enbiz.bo.app.enums;

public enum CS001 {
    IB("10","IB"),
    OB("20","OB");

    private final String cd;
    private final String cdNm;

    CS001(String cd,String cdNm){
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
