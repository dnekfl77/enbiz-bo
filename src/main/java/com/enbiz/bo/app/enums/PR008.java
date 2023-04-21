package com.enbiz.bo.app.enums;

public enum PR008 {
    CNTR_DLV("10","센터배송"),
    CORP_DLV("20","업체배송");

    private final String cd;
    private final String cdNm;

    PR008(String cd, String cdNm){
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
