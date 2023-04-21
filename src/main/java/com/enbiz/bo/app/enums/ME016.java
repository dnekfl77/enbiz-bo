package com.enbiz.bo.app.enums;


/**
 * 적립사용구분코드
 */
public enum ME016 {
    ACCUMULATE("01","적립"),
    USE("02","사용");

    private final String cd;
    private final String cdNm;

    ME016(String cd,String cdNm){
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
