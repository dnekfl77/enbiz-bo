package com.enbiz.bo.app.enums.common;

public enum CommonCode {
    NO_MEMBER("999999999","비회원"),
    CS_CNSL_TYP_ROOT("10150","상담유형ROOT"),
    MAX_DATE("29991231","29991231");

    private final String cd;
    private final String cdNm;

    CommonCode(String cd, String cdNm){
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
