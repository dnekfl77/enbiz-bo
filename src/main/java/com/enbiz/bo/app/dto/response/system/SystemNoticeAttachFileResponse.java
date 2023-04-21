package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("SystemNoticeAttachFileResponse")
@Getter
@Setter
public class SystemNoticeAttachFileResponse extends BaseCommonEntity {
    private String bbcNo;
    private Integer fileSeq;
    private String atchFileRouteNm;
    private String atchFileNm;
    private Integer atchFileDnldCnt;
}
