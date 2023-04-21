package com.enbiz.bo.app.enums;

public enum ME002 {
    ONLINE_MEMBER("10","온라인회원"),
    INNER_MEMBER("20","내부임직원"),
    CORP_MEMBER("30","법인회원"),
    NO_MEMBER("99","비회원");

    private final String cd;
    private final String cdNm;

    ME002(String cd,String cdNm){
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
