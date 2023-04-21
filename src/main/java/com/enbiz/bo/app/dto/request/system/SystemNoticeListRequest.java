package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("SystemNoticeListRequest")
@Getter
@Setter
public class SystemNoticeListRequest  extends BaseCommonDto {
    private String sysGbCd;             //시스템구분
    private String bbGbCd;              //게시판유형
    private String termGbCd;            //기간구분(등록일/게시일)
    private String strDtm;              //기간(시작일)
    private String endDtm;              //기간(종료일)
    private String bbYn;                //게시여부
    private String ntcGbCd;             //공지구분
    private String title;               //제목
    private String sysRegId;            //등록자ID
}
