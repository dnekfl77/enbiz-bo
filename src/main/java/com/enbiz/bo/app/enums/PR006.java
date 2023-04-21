package com.enbiz.bo.app.enums;

public enum PR006 {
    DIRC_PUR("10","직매입"),
    CNSG_PUR("20","위탁판매");

    private final String cd;
    private final String cdNm;

    PR006(String cd, String cdNm){
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
