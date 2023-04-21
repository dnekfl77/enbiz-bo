package com.enbiz.bo.app.enums;

public enum MK012 {
    BUY_AE("10","구매금액사은품"),
    GOODS_AE("20","상품사은품");

    private final String cd;
    private final String cdNm;

    MK012(String cd,String cdNm){
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