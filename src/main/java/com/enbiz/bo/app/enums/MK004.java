package com.enbiz.bo.app.enums;

public enum MK004 {
    PC("01","PC"),
    MOBILE("02","Mobile"),
    BO("03","BackOffice");

    private final String cd;
    private final String cdNm;

    MK004(String cd,String cdNm){
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
