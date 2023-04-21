package com.enbiz.bo.app.enums;

/**
 * 연락진행상태코드
 * @author 임성범
 *
 */
public enum CM017 {
    SENDER("10","발신자"),
    RECVMN("20","수신자");

    private final String cd;
    private final String cdNm;

    CM017(String cd, String cdNm){
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

