package com.enbiz.bo.app.enums;

public enum PR039 {

    PROC_YET("10", "미처리"),
    CUST_CNTR_MVOT("20", "고객센터이관"),
    PROC_FIN("30", "처리완료");

    private final String cd;
    private final String cdNm;

    PR039(String cd, String cdNm){
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
