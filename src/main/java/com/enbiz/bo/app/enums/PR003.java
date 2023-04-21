package com.enbiz.bo.app.enums;

public enum PR003 {
    NORMAL_SALE("10","일반판매"),
    RSV_SALE("20","예약상품");

    private final String cd;
    private final String cdNm;

    PR003(String cd,String cdNm){
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
