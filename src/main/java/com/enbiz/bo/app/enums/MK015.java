package com.enbiz.bo.app.enums;

public enum MK015 {
    PERIOD_STANDARD("01","기간기준"),
    ISSUED_STANDARD("02","발급일기준");

    private final String cd;
    private final String cdNm;

    MK015(String cd,String cdNm){
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
