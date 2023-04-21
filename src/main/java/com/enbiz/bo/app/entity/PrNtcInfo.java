package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrNtcInfo")
@Getter
@Setter
public class PrNtcInfo extends BaseCommonEntity {

    private String ntcNo             ; // 공지번호
    private String dispMediaCd       ; // 전시매체코드(DP018)
    private String ntcClssCd         ; // 공지분류코드(DP019)
    private String bbStrDtm          ; // 게시시작일시
    private String bbEndDtm          ; // 게시종료일시
    private String bbYn              ; // 게시여부
    private String qryCnt            ; // 조회수
    private String uprFixYn          ; // 상단고정여부
    private String ntcTitleNm        ; // 공지제목명
    private String pcNtcCont         ; // PC공지내용
    private String moNtcCont         ; // MO공지내용

}
