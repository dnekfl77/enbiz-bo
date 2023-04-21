package com.enbiz.bo.app.enums;

/**
 * 환불진행상태코드
 */
public enum OM024 {
    REFUND_RECEIPT("01","환불접수"),
    REFUND_REQUEST("02","환불요청"),
    REFUND_ACK("03","환불승인"),
    REFUND_COMPLETE("04","환불완료"),
    REFUND_CANCEL("05","환불취소");

    private final String cd;
    private final String cdNm;

    OM024(String cd, String cdNm){
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
