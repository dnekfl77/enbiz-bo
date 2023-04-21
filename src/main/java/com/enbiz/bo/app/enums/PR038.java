package com.enbiz.bo.app.enums;

public enum PR038 {

    SAFE_CERTI_TGT_YN("01", "안전인증대상여부"),
    BUYR_AGE_LMT_CD("02", "구입자나이제한코드"),
    DISP_YN("03", "전시여부"),
    SALE_STAT_CD("04", "판매상태코드"),
    STK_MGR_YN("05", "재고관리여부"),
    BUY_QTY_LMT_YN("06", "구매수량제한여부"),
    MIN_LMT_QTY("07", "최소제한수량"),
    MAX_LMT_QTY("08", "최대제한수량"),
    DELI_GOODS_GB_CD("09", "배송상품구분코드"),
    ITM_SOUT_NOTI_YN("10", "단품품절알림여부"),
    DELI_POLC_NO("11", "배송정책번호"),
    PRC_COMPA_EXP_YN("12", "가격비교노출여부"),
    SALE_METH_CD("13", "판매방식코드");

    private final String cd;
    private final String cdNm;

    PR038(String cd,String cdNm){
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
