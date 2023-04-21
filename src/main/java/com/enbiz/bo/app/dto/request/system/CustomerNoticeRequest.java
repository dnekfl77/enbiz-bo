package com.enbiz.bo.app.dto.request.system;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrNtcAtchFileInfo;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CustomerNoticeRequest")
@Getter
@Setter
public class CustomerNoticeRequest extends BaseCommonEntity {

    private String bbStrStartDtm       ; // 게시시작기간 시작일
    private String bbStrEndDtm         ; // 게시시작기간 종료일
    private String dispMediaCd         ; // 전시매체코드
    private String ntcTitleNm          ; // 공지제목명
    private String bbYn                ; // 게시여부
    private String ntcRegId            ; // 공지등록자ID

    private String ntcNo             ; // 공지번호
    private String ntcClssCd         ; // 공지분류코드(DP019)
    private String bbStrDtm          ; // 게시시작일시
    private String bbEndDtm          ; // 게시종료일시
    private String uprFixYn          ; // 상단고정여부
    private String pcNtcCont         ; // PC공지내용
    private String moNtcCont         ; // MO공지내용

    private List<PrNtcAtchFileInfo> deleteFileList;
    private List<PrNtcAtchFileInfo> uploadFileList;

}
