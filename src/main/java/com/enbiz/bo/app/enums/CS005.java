package com.enbiz.bo.app.enums;

public enum CS005 {
    RECEIPT("10","접수"),
    IN_PROGRESS("20","처리중"),
    TRANSFER_REQUEST("30","이관요청"),
    COMPLETE("40","완료");

    private final String cd;
    private final String cdNm;

    CS005(String cd,String cdNm){
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
