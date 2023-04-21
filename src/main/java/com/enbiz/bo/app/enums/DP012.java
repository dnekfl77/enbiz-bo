package com.enbiz.bo.app.enums;

/**
 * //전시번호구분코드(DP012)
 *
 */
public enum DP012 {
	DISPLAY_CATEGORY("01","전시카테고리"),
	EXHIBITION("02","기획전");

    private final String cd;
    private final String cdNm;

    DP012(String cd, String cdNm){
        this.cd = cd;
        this.cdNm = cdNm;
    }

    public String getCd() {
        return cd;
    }
    
    public String getCdNm() {
    	return cdNm;
    }

    public boolean isEquals(String cd){
        return cd.equals(this.getCd());
    }
}

