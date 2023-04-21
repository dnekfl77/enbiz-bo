package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prSitePopupChlAplyInfo")
@Getter
@Setter
public class PrSitePopupChlAplyInfo extends BaseCommonEntity{
    private String popupNo                ; // 팝업번호
    private String chlNo                  ; // 채널번호
    private String chlNm                  ; // 채널명
    private String linkInfo               ; // 연결정보
}