package com.enbiz.bo.app.enums;

public enum CS022 {
    UNPAID("10","미지급"),
    PAYMENT_REQUEST("20","지급요청"),
    WAIT_PAYMENT("30","지급대기"),
    NON_PAYMENT("40","지급불가"),
    COMPLE_PAYMENT("50","지급완료");

    private final String cd;
    private final String cdNm;

    CS022(String cd,String cdNm){
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
