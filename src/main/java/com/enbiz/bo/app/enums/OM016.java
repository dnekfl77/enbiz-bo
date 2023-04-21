package com.enbiz.bo.app.enums;

public enum OM016 {
    TEMP_SAVE("00", "임시저장"),
    ORD_FAIL("10", "주문실패"),
    ORD_COMPLETE("20", "주문완료");

    private final String cd;
    private final String cdNm;

    OM016(String cd, String cdNm){
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
