package com.enbiz.bo.app.enums;

/**
 * //전시그룹유형코드(DP011)
 *
 */
public enum DP011 {
	REPRESENTATIVE_EXHIBITION("01","대표기획전"),
	RANKING_ZONE_AWARD("02","랭킹존대상");

    private final String cd;
    private final String cdNm;

    DP011(String cd, String cdNm){
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

