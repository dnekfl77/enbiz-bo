package com.enbiz.bo.app.enums;

/**
 * 시스템 구분 코드
 * @author 이원희
 *
 */
public enum UR005 {
    BACK_OFFICE("11","백오피스"),
    CUSTOMER_CENTER("12","고객센터"),
    PARTNER("31","파트너"),
    ALLIANCE("32","제휴사");

    private final String cd;
    private final String cdNm;

    UR005(String cd, String cdNm){
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
