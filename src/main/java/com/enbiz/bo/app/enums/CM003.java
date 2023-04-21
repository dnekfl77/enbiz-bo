package com.enbiz.bo.app.enums;

/**
 * 연락유형코드
 * @author 임성범
 *
 */
public enum CM003 {
    BO("10","BO"),
    PARTNER_SYSTEM("20","파트너시스템");

    private final String cd;
    private final String cdNm;

    CM003(String cd, String cdNm){
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

