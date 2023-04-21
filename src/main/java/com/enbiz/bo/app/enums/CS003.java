package com.enbiz.bo.app.enums;

public enum CS003 {
    CALL("10","일반콜"),
    ONE_TO_ONE("20","1:1문의"),
    QnA("30","상품Q&A"),
    CHAT("40","채팅"),
    OB("50","OB");

    private final String cd;
    private final String cdNm;

    CS003(String cd,String cdNm){
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
