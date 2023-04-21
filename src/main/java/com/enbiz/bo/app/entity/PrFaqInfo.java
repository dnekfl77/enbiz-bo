package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prFaqInfo")
@Getter
@Setter
public class PrFaqInfo extends BaseCommonEntity {

    private String faqNo            ; // FAQ번호
    private String faqLgrpCd        ; // FAQ대분류코드
    private String faqMgrpCd        ; // FAQ중분류코드
    private String uprFixYn         ; // 상단고정여부
    private Integer sortSeq         ; // 정렬순서
    private String bbYn             ; // 게시여부
    private String custInqTypCd     ; // 고객문의유형코드
    private String title            ; // 제목
    private String pcNtcCont        ; // PC공지내용
    private String moNtcCont        ; // MO공지내용
    private Integer qryCnt          ; // 조회수

}
