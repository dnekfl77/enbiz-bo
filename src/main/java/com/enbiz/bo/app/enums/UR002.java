package com.enbiz.bo.app.enums;

/**
 * 업무그룹코드
 */
public enum UR002 {
    SYSTEM_MANAGER("11","시스템관리자"),
    HOFF("12","본사"),
    MD("13","MD"),
    MARKETING("14","마케팅"),
    EC_SPDP("15","EC기획"),
    LGST_CNTR("16","물류센터"),
    CUST_CNTR("17","고객센터"),
    COOP_CORP("31","협력업체"),
    AFCR("51","제휴사");

    private final String cd;
    private final String cdNm;

    UR002(String cd, String cdNm){
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
