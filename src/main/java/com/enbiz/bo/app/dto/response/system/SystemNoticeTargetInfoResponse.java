package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;


@Alias("SystemNoticeTargetInfoResponse")
@Getter
@Setter
public class SystemNoticeTargetInfoResponse {
    private String userId;
    private String userNm;
    private String jobGrpCd;
    private String orgTypNm;
    private String workStatCd;
    private String workStatNm;
}
