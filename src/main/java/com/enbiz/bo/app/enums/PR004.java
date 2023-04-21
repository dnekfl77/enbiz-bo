package com.enbiz.bo.app.enums;

public enum PR004 {
    ZERO("0","0"),
    TWELVE("12","12"),
    FIFTEEN("15","15"),
    NINETEEN("19","19");

    private final String cd;
    private final String cdNm;

    PR004(String cd, String cdNm){
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

