package com.enbiz.bo.app.enums;

/**
 * 연락진행상태코드
 * @author 임성범
 *
 */
public enum CM016 {
    RECEIVE("10","수신"),
    READ("20","읽음"),
    ANSWERED("30","답변");

    private final String cd;
    private final String cdNm;

    CM016(String cd, String cdNm){
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

