package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StJobCnctAtchFile")
@Getter
@Setter
public class StJobCnctAtchFile extends BaseCommonEntity {

    private String jobCnctNo;				//업무연락번호
    private String dispRecvGbCd;		//발신수신구분코드(CM017)
    private String userId;					//사용자아이디
    private String fileSeq;					//파일순번
    private String atchFileRouteNm;		//첨부파일경로명
    private String atchFileNm;				//첨부파일명
    private String atchFileDnldCnt;		//첨부파일다운로드수
}
