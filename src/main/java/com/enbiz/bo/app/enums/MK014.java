package com.enbiz.bo.app.enums;

public enum MK014 {
    SITE("01","사이트"),
    GOODS("02","상품"),
    CATEGORY("03","전시카테고리"),
    STD_GOODS("04","표준상품분류"),
    ENTR("05","협력사"),
    BRAND("06","브랜드"),
    CHANNEL("07","채널");

    private final String cd;
    private final String cdNm;

    MK014(String cd,String cdNm){
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
