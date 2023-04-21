package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerNoticeResponse")
@Getter
@Setter
public class CustomerNoticeResponse extends BaseCommonEntity {
	private String dispMediaCd         ; // 전시매체코드(DP018)
    private String dispMediaCdNm       ; // 전시매체코드명
    private String ntcClssCd           ; // 공지분류코드(DP019)
    private String ntcClssCdNm         ; // 공지분류코드명
    private String ntcNo               ; // 공지번호
    private String ntcTitleNm          ; // 공지제목명
    private String bbYn                ; // 게시여부
    private String bbStrDtm            ; // 게시시작일시
    private String bbEndDtm            ; // 게시종료일시
    private String qryCnt              ; // 조회수
    private String uprFixYn            ; // 상단고정여부
    private String pcNtcCont           ; // PC공지내용
    private String moNtcCont           ; // MO공지내용
}
