package com.enbiz.bo.app.enums;

/**
 * 환불사유코드
 */
public enum OM025 {
    CANCEL("01","취소"),
    RETURN("02","반품"),
    OVERPAY("03","과입금"),
    DEPOSIT("04","예치금"),
    CALL_REFUND("05","콜센터직권환불"),
    CPS_REFUND("06","보상금환불"),
    ETC("07","기타");

    private final String cd;
    private final String cdNm;

    OM025(String cd, String cdNm){
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
