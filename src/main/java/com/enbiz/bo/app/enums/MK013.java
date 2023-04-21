package com.enbiz.bo.app.enums;

public enum MK013 {
    APPLY("01","적용"),
    LIMIT("02","제한");

    private final String cd;
    private final String cdNm;

    MK013(String cd,String cdNm){
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
