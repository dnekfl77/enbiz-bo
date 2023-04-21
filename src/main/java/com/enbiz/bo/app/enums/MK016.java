package com.enbiz.bo.app.enums;

/**
 * 회원유형코드
 */
public enum MK016 {
    ALL("01","전체"),
    INNER_MEMBER("02","임직원"),
    MEMBER("03","일반회원");

    private final String cd;
    private final String cdNm;

    MK016(String cd,String cdNm){
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

