package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품QA질문정보
 */
@Alias("PrGoodsQaQuestInfo")
@Getter
@Setter
public class PrGoodsQaQuestInfo extends BaseCommonEntity{

    private String questNo                  ; // 질문번호
    private String siteNo                   ; // 사이트번호
    private String goodsNo                  ; // 상품번호
    private String mbrNo                    ; // 회원번호
    private String questTypCd               ; // 질문유형코드(PR041)
    private String questCont                ; // 질문내용
    private String questDtm                 ; // 질문일시
    private String procStatCd               ; // 처리상태코드(PR039)
    private String procStatDtm              ; // 처리상태변경일시
    private String procId                   ; // 처리상태변경자ID
    private String notiMethodCd             ; // 알림방법코드(PR040)
    private String scrtScrpYn               ; // 비밀글여부
    private String cellSctNo                ; // 휴대폰구분번호
    private String cellTxnoNo               ; // 휴대폰국번번호
    private String cellEndNo                ; // 휴대폰끝번호
    private String emailAddr                ; // 이메일주소
    private String questDispStatCd          ; // 질문전시상태코드(PR022)
    private String questDispProcDtm         ; // 질문전시처리일시
    private String questDispProcmnId        ; // 질문전시처리자ID
    private String mvotYn                   ; // 이관여부
    private String mvotCaus                 ; // 이관사유
    private String delYn                    ; // 삭제여부


}
