package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StJobCnctRecvmnInfo")
@Getter
@Setter
public class StJobCnctRecvmnInfo extends BaseCommonEntity {

    private String jobCnctNo;				//업무연락번호
    private String recvmnId;				//수신자아이디
    private String cnctPrgsStatCd;		//연락진행상태코드(CM016)
    private String recvDtm;					//수신일시
    private String qryDtm;					//조회일시
    private String ansDtm;					//답변일시
    private String ansCont;					//답변내용
    private String dsmnAnsConfYn;		//발신자답변확인여부
    private String dsmnAnsConfDtm;	//발신자답변확인일시
}
