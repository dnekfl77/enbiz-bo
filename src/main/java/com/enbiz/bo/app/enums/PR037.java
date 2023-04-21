package com.enbiz.bo.app.enums;

public enum PR037 {

    MBR("10", "회원"),
    AEMP("20", "담당자");

    private final String cd;
    private final String cdNm;

    PR037(String cd, String cdNm){
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
