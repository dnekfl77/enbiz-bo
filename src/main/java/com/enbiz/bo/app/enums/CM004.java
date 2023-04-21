package com.enbiz.bo.app.enums;

/**
 * 시스템 공지사항 구분 코드
 * @author 이원희
 *
 */
public enum CM004 {
    NOTICE("100","공지사항"),
    REFERENCE("200","자료실"),
    FAQ("300","FAQ");

    private final String cd;
    private final String cdNm;

    CM004(String cd, String cdNm){
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

