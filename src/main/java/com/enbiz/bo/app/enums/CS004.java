package com.enbiz.bo.app.enums;

public enum CS004 {
    HEAD_QUARTER("10","본사"),
    CALL_CENTER("20","콜센터"),
    ENTR("30","협력사");

    private final String cd;
    private final String cdNm;

    CS004(String cd,String cdNm){
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
