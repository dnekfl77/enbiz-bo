package com.enbiz.bo.app.enums;

public enum MK007 {
    TARGET_DESIGN("01","대상자지정발급"),
    CONDITION_AUTO("02","조건부자동발급"),
    CUSTOMER_DOWN("03","고객다운로드발급");

    private final String cd;
    private final String cdNm;

    MK007(String cd,String cdNm){
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
