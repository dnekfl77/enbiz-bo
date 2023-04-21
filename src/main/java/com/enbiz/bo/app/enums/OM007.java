package com.enbiz.bo.app.enums;

public enum OM007 {
    CALL("10", "Call"),
    PC("20", "PC"),
    MOBILE_WEB("30", "모바일웹"),
    ANDROID_APP("40", "안드로이드앱"),
    IOS_APP("50", "IOS앱"),
    COALITION("60", "제휴"),
    ENORMOUS_VOLUME("70", "대량");

    private final String cd;
    private final String cdNm;

    OM007(String cd, String cdNm){
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
