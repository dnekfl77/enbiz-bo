package com.enbiz.bo.app.enums;

public enum PR009 {
    HD_DLV("01","택배배송"),
    NON_DLV("02","무배송");

    private final String cd;
    private final String cdNm;

    PR009(String cd, String cdNm){
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
