package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrSitePopupChlAplyInfoResponse")
@Getter
@Setter
public class PrSitePopupChlAplyInfoResponse extends BaseCommonEntity {

    private String popupNo                ; // 팝업번호
    private String chlNo                  ; // 채널번호
    private String chlNm                  ; // 채널명
    private String linkInfo               ; // 연결정보

}
