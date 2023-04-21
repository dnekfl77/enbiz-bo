package com.enbiz.bo.app.constant;

public class Constants {
	public static final String DEFAULT_SYSTEM_LANGUAGE = "app.lang.defaultSystemLanguage";
    public static final String DEFAULT_COUNTRY_CD = "defaultCntryCd";
    public static final String DEFAULT_LOGGER_CATEGORY = "default.cat";

    /** 개인정보 관련 **/
    // 개인정보를 확인할 수 있도록 SESSION에 담는 정보
    public static final String SKIP_PERSONAL_INFORMATION_MASKING = "_SKIP_PERSONAL_INFORMATION_MASKING";

    //common message properties
    public static final String MSG_COMMON_PARAMETER_EMPTY_ERROR = "adminCommon.message.parameter.empty";

    // 온라인몰 고객센터 CALLBACK 번호(임시!! 수정필요 고객센터번호 입니다)
    public static final String CC_CALLBACK_NUMBER = "0000-0000";
    
    //센터배송 기본 협력사 번호
    public static final String CNTR_DLV_BASE_ENTR_NO = "0";
    
    // 서버구분코드 [COM???]
    public static final String COM_SERV_SCT_CD = "COM???";
    // 서버구분코드 - 개발
    public static final String COM_SERV_SCT_CD_DEV = "D";
    // 서버구분코드 - 테스트
    public static final String COM_SERV_SCT_CD_TST = "S";
    // 서버구분코드 - 운영
    public static final String COM_SERV_SCT_CD_PRD = "P";

    public static final String[] GUEST_URIS = {"/",
            "/index.do",
            "/delivery/fullOrderInquiryList.fullOrderInquiryExcelDownload.do",
            "/delivery/deliveryManagement.getDeliveryExcelDownload.do",
            "/goods/GoodsItemMgmt.goodsItemSoldOutNotificationYnModifyView.do",
            "/goods/GoodsItemMgmt.goodsItemStockQuantityModifyView.do",
            "/goods/GoodsItemMgmt.goodsItemSaleStateModifyView.do",
            "/getCommonCode.do",
            "/dlvOrdExcelDownload.do",
            "/alarm/gates",
            "/alarm/gate",
            "/gate/**",
            "/Admincommon/systemMessage.do",
            "/common/getCdCdNmByMixedCode.do",
            "/common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do",
            "/redirect.do",
            "/loginForm.do",
            "/vendor/getStStdCdByMixedCodeRef1Val.do"
            };

    private Constants() {
	}
}