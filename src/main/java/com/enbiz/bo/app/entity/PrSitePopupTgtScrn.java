package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prSitePopupTgtScrn")
@Getter
@Setter
public class PrSitePopupTgtScrn extends BaseCommonEntity{
    private String popupNo                  ; // 팝업번호
    private String popupTgtScrnCd           ; // 팝업대상화면코드
}