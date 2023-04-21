package com.enbiz.bo.app.enums;

public enum PR024 {
    SAVED("10","임시저장"),
    IN_PROCESS("20","승인대기"),
    RETURN("30","반려"),
    PASS("40","승인완료");

    private final String cd;
    private final String cdNm;

    PR024(String cd, String cdNm){
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

