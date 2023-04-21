package com.enbiz.bo.app.enums;

public enum CS021 {
    RECEIPT("10","접수"),
    CANCEL("11","접수취소"),
    REWARD_APPROVAL("20","보상승인"),
    REWARD_RETURN("21","보상반려"),
    PAYMENT_APPROVAL("30","지급승인"),
    PAYMENT_RETURN("31","지급반려");

    private final String cd;
    private final String cdNm;

    CS021(String cd,String cdNm){
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
