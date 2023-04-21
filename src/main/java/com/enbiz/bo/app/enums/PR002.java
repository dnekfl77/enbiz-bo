package com.enbiz.bo.app.enums;

public enum PR002 {
    GEN_GOODS("10","일반상품"),
    GFT_GOODS("20","사은품"),
    CPN_GOODS("30","e-쿠폰상품");

    private final String cd;
    private final String cdNm;

    PR002(String cd, String cdNm){
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

