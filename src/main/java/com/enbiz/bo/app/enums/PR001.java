package com.enbiz.bo.app.enums;

public enum PR001 {
    GEN_GOODS("10","일반상품"),
    PKG_GOODS("20","묶음상품");

    private final String cd;
    private final String cdNm;

    PR001(String cd, String cdNm){
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

