package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrStdCtgResponse")
@Getter
@Setter
public class PrStdCtgResponse extends BaseCommonEntity {
    
    private String stdCtgNo                   ; // 표준카테고리번호
    private String stdCtgNm                   ; // 표준카테고리명
    private String uprStdCtgNo                ; // 상위표준카테고리번호
    private String uprStdCtgNm                ; // 상위표준카테고리명
    private Integer sortSeq                   ; // 정렬순서
    private String useYn                      ; // 사용여부
    private String leafCtgYn                  ; // 리프카테고리 여부
    private String safeCertiNeedYn            ; // 안전인증필요 여부
    private String mdId                       ; // MD아이디
    private String mdNm                       ; // MD명
    private String goodsNotiLisartCd          ; // 상품고시품목코드(PR012)
    private String goodsNotiLisartCdNm        ; // 상품고시품목코드명
    private String leafCtgYnChangePossible    ; //리프표준분류여부 변경 가능여부 (N이면 밑에 자식이 있다는거다...leaf로 변경 못함)

    // 트리관련
    private String stdLrgCtgNo 			;//표준대카테고리번호 varchar(15) Null
    private String stdMidCtgNo 			;//표준중카테고리번호 varchar(15) Null
    private String stdSmlCtgNo 			;//표준소카테고리번호 varchar(15) Null
    private String stdThnCtgNo 			;//표준세카테고리번호 varchar(15) Null
    private String level				; //레벨
    private String hierarchy			; //계층구조
    private String hierarchyText		; //ex) 색조화장품>베이스 메이크업

}
