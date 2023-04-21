package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrSitePopupChlAplyInfoRequest")
@Getter
@Setter
public class PrSitePopupChlAplyInfoRequest extends BaseCommonEntity {
    private String popupNo                ; // 팝업번호
    private String chlNo                  ; // 채널번호
    private String chlNm                  ; // 채널명
    private String linkInfo               ; // 연결정보
    private String state                  ; // 그리드상태
}
