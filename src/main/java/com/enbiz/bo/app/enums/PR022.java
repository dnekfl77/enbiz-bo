package com.enbiz.bo.app.enums;

public enum PR022 {

    NOT_DISPLAY("10", "전시안함"),
    DISPLAY("20", "전시처리"),
    UNABLE_DISPLAY("30", "전시불가");

    private final String cd;
    private final String cdNm;

    PR022(String cd, String cdNm){
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
