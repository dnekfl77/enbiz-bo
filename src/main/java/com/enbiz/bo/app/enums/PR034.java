package com.enbiz.bo.app.enums;

public enum PR034 {

    WHSG_CNCL("10","입고취소"),
    SALE_CVRT("11","즉시일반판매전환"),
    SLR_CNCL("12","판매자 사정에 의한 예약판매취소");

    private final String cd;
    private final String cdNm;

    PR034(String cd,String cdNm){
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
