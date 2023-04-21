package com.enbiz.bo.app.enums;

public enum ME001 {
    MEMBER("10","정회원"),
    NO_MEMBER("99","비회원");

    private final String cd;
    private final String cdNm;

    ME001(String cd,String cdNm){
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
