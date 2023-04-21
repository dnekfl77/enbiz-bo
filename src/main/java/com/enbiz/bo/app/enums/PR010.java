package com.enbiz.bo.app.enums;

public enum PR010 {
    GEN_GOODS("01","일반상품"),
    INST_GOODS("02","설치상품"),
    ORDMK_GOODS("03","주문제작");

    private final String cd;
    private final String cdNm;

    PR010(String cd, String cdNm){
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
