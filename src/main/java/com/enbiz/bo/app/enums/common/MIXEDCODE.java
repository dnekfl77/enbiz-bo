package com.enbiz.bo.app.enums.common;

public enum MIXEDCODE {

    NORMAL_CODE("NC","normal code search"),
    NORMAL_MULTI_CODE("NMC","normal multi code search"),
    TABLE("T","테이블조회"),
    REFER_CODE("RC","refer code search");

    private final String cd;
    private final String cdNm;

    MIXEDCODE(String cd, String cdNm){
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
