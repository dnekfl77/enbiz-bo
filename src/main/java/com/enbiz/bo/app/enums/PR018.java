package com.enbiz.bo.app.enums;

public enum PR018 {
    GB_CD_COMM("01","공통"),
    GB_CD_ENTR("02","협력사전용");

    private final String cd;
    private final String cdNm;

    PR018(String cd, String cdNm){
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

