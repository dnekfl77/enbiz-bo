package com.enbiz.bo.app.enums;

/**
 * 권한대상 유형 코드(UR010)
 * @author 이원희
 *
 */
public enum UR010 {
    MENU("10","메뉴"),
    SCREEN("20","화면"),
    REQUEST("30","Request"),
    BUTTON("40","버튼");

    private final String cd;
    private final String cdNm;

    UR010(String cd, String cdNm){
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
