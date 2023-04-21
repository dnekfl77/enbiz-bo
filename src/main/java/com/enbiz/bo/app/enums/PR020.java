package com.enbiz.bo.app.enums;

public enum PR020 {
    GOODS("10","상품"),
    ITEM("20","단품");

    private final String cd;
    private final String cdNm;

    PR020(String cd, String cdNm){
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

