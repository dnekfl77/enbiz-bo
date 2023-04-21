package com.enbiz.bo.app.enums;

public enum CS006 {
    RECEIPT("10","접수"),
    RECEIPT_CANCEL("20","접수취소"),
    TRANSFER_REQUEST("30","처리중"),
    COMPLETE("40","완료");

    private final String cd;
    private final String cdNm;

    CS006(String cd,String cdNm){
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
