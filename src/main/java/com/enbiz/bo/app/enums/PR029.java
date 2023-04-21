package com.enbiz.bo.app.enums;
/**
 * 등록유입경로코드
 */
public enum PR029 {
    LEGACY_SYSTEM("01","기간계시스템"),
    BO_SYSTEM("02","BO시스템"),
    PARTNER_SYSTEM("03","파트너시스템");

    private final String cd;
    private final String cdNm;

    PR029(String cd, String cdNm){
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

