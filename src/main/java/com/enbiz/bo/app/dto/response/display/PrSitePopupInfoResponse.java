package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrSitePopupInfoResponse")
@Getter
@Setter
public class PrSitePopupInfoResponse extends BaseCommonEntity {

    private String popupDispDtm	            ; // 팝업기간
    private String screenNm	                ; // 팝업대상화면
    private String popupNo                  ; // 팝업번호
    private String popupNm                  ; // 팝업명
    private String siteNo                   ; // 사이트번호
    private String siteNm                   ; // 사이트명
    private String popupDispStrDtm          ; // 팝업전시시작일시
    private String popupDispEndDtm          ; // 팝업전시종료일시
    private String popupTypCd               ; // 팝업유형코드
    private Integer prioRnk                 ; // 우선순위
    private String dispMediaCd              ; // 전시매체코드
    private Integer popupSzWdt              ; // 팝업사이즈넓이
    private Integer popupSzHigh             ; // 팝업사이즈높이
    private Integer popupLocLeft            ; // 팝업위치 LEFT
    private Integer popupLocTop             ; // 팝업위치 TOP
    private String prtTypCd                 ; // 출력유형코드
    private String popupImgPathNm           ; // 팝업이미지경로명
    private String popupImgFileNm           ; // 팝업이미지파일명
    private String popupLnk                 ; // 팝업링크
    private String popupCont                ; // 팝업내용
    private String useYn                    ; // 사용여부

}
