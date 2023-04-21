package com.enbiz.bo.app.dto.request.display;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrSitePopupInfoRequest")
@Getter
@Setter
public class PrSitePopupInfoRequest extends BaseCommonEntity {
    private String siteNo		; 	// 사이트번호
    private String siteNm		; 	// 사이트명
    private String chlNo		; 	// 채널번호
    private String chlNm		; 	// 채널명
    private String popupNo		; 	// 팝업번호
    private String popupNm		; 	// 팝업명
    private String popupDispDtm	; 	// 팝업기간
    private String startDate	; 	// 시작날짜
    private String endDate	    ; 	// 종료날짜
    private String prioRnk  	; 	// 우선순위
    private String screenNm	    ; 	// 팝업대상화면
    private String dispMediaCd	; 	// 전시매체
    private String useYn    	; 	// 사용여부
    private String popupImgPathNm    ; // 팝업이미지경로명
    private String popupImgFileNm    ; // 팝업이미지파일명
    private List popupTgtScrn        ; // 팝업 대상화면
    private String popupTgtScrnList  ; // 팝업 대상화면 리스트
    private String startHour    ;
    private String startMinute  ;
    private String popupDispStrDtm   ; // 팝업전시시작일시
    private String endHour      ;
    private String endMinute    ;
    private String popupDispEndDtm   ; // 팝업전시종료일시
    private String popupTypCd   ;
    private Integer popupSzWdt  ; // 팝업사이즈넓이
    private Integer popupSzHigh ; // 팝업사이즈높이
    private Integer popupLocLeft; // 팝업위치 LEFT
    private Integer popupLocTop ; // 팝업위치 TOP
    private String popupCont    ; // 팝업내용
    private String prtTypCd     ;
    private String popupLnk     ; // 팝업링크
}
