package com.enbiz.bo.app.enums;

/**
 *배송지역구분코드
 */
public enum PR023 {
    FERRY_RGN_DLEX_AMT("01","도서산간"),
    JEJU_DLEX("02","제주도"),
    JEJU_FERRY_RGN_DLEX_AMT("03","제주도도서산간");

    private final String cd;
    private final String cdNm;

    PR023(String cd, String cdNm){
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
