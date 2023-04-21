package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StBbAtchFile")
@Getter
@Setter
public class StBbAtchFile extends BaseCommonEntity {
    private String bbcNo;
    private Integer fileSeq;
    private String atchFileRouteNm;
    private String atchFileNm;
    private Integer atchFileDnldCnt;
}
