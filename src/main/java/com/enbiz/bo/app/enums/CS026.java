package com.enbiz.bo.app.enums;

public enum CS026 {
    RESERVES("10","24", "적립금(단위 개월수)"),
    POINT("20","24","포인트(단위 개월수)");

    private final String cd;
    private final String cdNm;
    private final String cdDesc;

    CS026(String cd,String cdNm,String cdDesc){
        this.cd = cd;
        this.cdNm = cdNm;
        this.cdDesc = cdDesc;
    }

    public String getCd() {
        return cd;
    }
    public String getCdNm() { return cdNm; }
    public String getCdDesc() { return cdDesc; }

    public boolean isEquals(String cd){
        return cd.equals(this.getCd());
    }
}
