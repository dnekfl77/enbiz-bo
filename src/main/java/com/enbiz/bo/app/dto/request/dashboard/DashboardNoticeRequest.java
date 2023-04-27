package com.enbiz.bo.app.dto.request.dashboard;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Alias("DashboardNoticeRequest")
@Getter
@Setter
@Accessors(chain = true)
public class DashboardNoticeRequest extends BaseCommonEntity{
    private String sysGbCd;             //시스템구분
    private String bbGbCd;              //게시판유형
    private String termGbCd;            //기간구분(등록일/게시일)
    private String strDtm;              //기간(시작일)
    private String endDtm;              //기간(종료일)
    private String bbYn;                //게시여부
    private String ntcGbCd;             //공지구분
    private String bbcNo;				//공지번호
    private String popYn;				//팝업여부
}
