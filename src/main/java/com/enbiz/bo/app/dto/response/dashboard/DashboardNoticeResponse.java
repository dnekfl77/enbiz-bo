package com.enbiz.bo.app.dto.response.dashboard;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.dto.response.system.SystemNoticeAttachFileResponse;

import lombok.Getter;
import lombok.Setter;

@Alias("DashboardNoticeResponse")
@Getter
@Setter
public class DashboardNoticeResponse {
    private String bbcNo;                //공지번호
    private String sysGbNm;              //시스템구분
    private String bbGbNm;               //게시구분
    private String bbGbCd;			     //게시구분코드
    private String ntcTypCd;		     //공지유형코드
    private String ntcGbNm;              //공지구분
    private String title;                //제목
    private String bbYn;                 //게시여부
    private String bbStrDtm;             //게시시작일
    private String bbEndDtm;             //게시종료일
    private String fxdcYn;               //고정글여부
    private String popYn;                //팝업사용여부
    private Integer qryCnt;              //조회수
    private String sysRegDte;            //등록일
    private String bbcCont;				 //내용
    private List<SystemNoticeAttachFileResponse> fileList; //첨부파일
}
