package com.enbiz.bo.app.enums;

/**
 * 변경대상유형코드
 * @author 이원희
 *
 */
public enum UR011 {
    ACCOUNT_CREATE("10","계정생성"),
    ACCOUNT_DELETE("11","계정삭제"),
    ACCOUNT_STOP("12","계정중지"),
    PASSWORD("13","비밀번호"),
    WORK_GROUP("14","업무그룹");

    private final String cd;
    private final String cdNm;

    UR011(String cd, String cdNm){
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
