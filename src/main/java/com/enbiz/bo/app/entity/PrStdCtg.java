package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prStdCtg")
@Getter
@Setter
public class PrStdCtg extends BaseCommonEntity {
    private String stdCtgNo            ;    // 표준카테고리번호
    private String stdCtgNm            ;    // 표준카테고리명
    private String leafCtgYn           ;    // 리프카테고리여부
    private String useYn               ;    // 사용여부
    private Integer sortSeq            ;    // 정렬순서
    private String uprStdCtgNo         ;    // 상위표준카테고리번호
    private String stdLrgCtgNo         ;    // 표준대카테고리번호
    private String stdMidCtgNo         ;    // 표준중카테고리번호
    private String stdSmlCtgNo         ;    // 표준소카테고리번호
    private String stdThnCtgNo         ;    // 표준세카테고리번호
    private String mdId                ;    // MD아이디
    private String safeCertiNeedYn     ;    // 안전인증필요여부
   	private String goodsNotiLisartCd   ;    // 상품고시품목코드
}
