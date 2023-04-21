package com.enbiz.bo.app.dto.response.common;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Alias("DashboardAlarmResponse")
@Getter
@Setter
public class DashboardAlarmResponse {
    private	String jobCnctNo;	            //업무연락번호
    private String cnctTypCd;               //연락유형코드(CM003)
    private String title;                   //제목
    private String emergYn;                 //긴급여부
    private String dspDtm;                  //발신일시
    private String cnctPrgsStatCd;          //연락진행상태코드(CM016)
    private String recvDtm;                 //수신일시
}
