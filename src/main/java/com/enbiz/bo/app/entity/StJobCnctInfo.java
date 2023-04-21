package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StJobCnctInfo")
@Getter
@Setter
public class StJobCnctInfo extends BaseCommonEntity {

    private String jobCnctNo;		//업무연락번호
    private String cnctTypCd;		//연락유형코드(CM003)
    private String dspDtm;			//발신일시
    private String userId;			//발신자아이디
    private String title;				//제목
    private String cont;				//내용
    private String emergYn;			//긴급여부
}
