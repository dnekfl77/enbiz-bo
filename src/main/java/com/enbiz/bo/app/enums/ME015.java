package com.enbiz.bo.app.enums;

/**
 * 자산구분코드
 */
public enum ME015 {
    ACTIVITY_POINT("10","활동포인트"),
    RESERVES("30","적립금"),
    DEPOSIT("50","예치금");

    private final String cd;
    private final String cdNm;

    ME015(String cd,String cdNm){
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
