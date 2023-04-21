package com.enbiz.bo.app.enums;

public enum PR005 {
    SALES("10","판매중"),
    SOLD_OUT("20","품절"),
    SUSPEND("30","일시중단"),
    SALE_END("40","판매종료");

    private final String cd;
    private final String cdNm;

    PR005(String cd,String cdNm){
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

