package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CcCmAgmtPolcInfoRequest")
@Getter
@Setter
public class CcCmAgmtPolcInfoRequest extends BaseCommonEntity {

    private String cmAgmtSeq;          //약관순번
    private String agmtPolcCd;         //약관정책코드(CH005)
    private String cmAgmtPolcGbCd;     //공통약관정책구분코드(CH010)
    private String aplyStrDt;          //적용시작일자
    private String aplyEndDt;          //적용종료일자
    private String siteNo;             //사이트
    private String title;              //약관제목
    private String wrdCont;            //내용
}