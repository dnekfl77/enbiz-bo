package com.enbiz.bo.app.enums;

public enum CS019 {
    RESERVES("10","적립금"),
    DEPOSIT("20","예치금"),
    CASH("30","현금");

    private final String cd;
    private final String cdNm;

    CS019(String cd,String cdNm){
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
