package com.enbiz.bo.app.dto.response.customerservice;


import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsTransReqResponse")
@Getter
@Setter
public class CsTransReqResponse extends BaseCommonEntity {
    private String ccnNo;           //상담번호
    private String cnslProcSeq;     //상담처리순번
    private String mvotReqSeq;      //이관요청순번
    private String csMvotTypNo;     //CS이관유형번호
    private String mvotReqCont;     //이관요청내용
    private String mvotProcStatCd;  //이관처리상태코드(cs006)
    private String mvotProcStatNm;  //이관처리상태코드(cs006)
    private String mvotReqmnId;     //이관요청자ID
    private String mvotReqmnNm;     //이관요청자ID
    private String mvotReqDtm;      //이관요청일시
    private String emergMvotYn;     //긴급이관여부
    private String mvotAfAempId;    //이관후담당자ID
    private String quotDtm;         //할당일시
    private String fnshmnId;        //완료자
    private String fnshDtm;         //완료일시
    private String csMvotTypNm;     //CS이관유형명
}
