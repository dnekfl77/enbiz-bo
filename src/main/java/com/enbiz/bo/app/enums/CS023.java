package com.enbiz.bo.app.enums;

public enum CS023 {
    OneToOne("20","1:1문의"),
    GOODS_QnA("30","상품Q&A"),
    OB("50","OB");

    private final String cd;
    private final String cdNm;

    CS023(String cd,String cdNm){
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
