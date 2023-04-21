package com.enbiz.bo.app.dto.request.system;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemNoticeFileCudRequest {

    private String bbcNo;
    private Integer fileSeq;
    private String atchFileNm;
    private String atchFileRouteNm;
    private String reAtchFileNm;

}
