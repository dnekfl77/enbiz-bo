package com.enbiz.bo.app.enums;

public enum CS002 {
    CALL("10","CALL"),
    WEB("20","WEB");

    private final String cd;
    private final String cdNm;

    CS002(String cd,String cdNm){
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
