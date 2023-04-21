package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("ZipNoMgmtResponse")
@Getter
@Setter
public class ZipNoMgmtResponse extends BaseCommonDto {

    private String zipNoSeq;
    private String zipNo;
    private String ctpNm;
    private String sigNm;
    private String hemdNm;
    private String lnbrMnnm;
    private String lnbrSlno;
    private String roadNm;
    private String buldMnnm;
    private String buldSlno;
    private String posBulNm;
    private String buldDtlNm;
    private String bdMgtSn;

}
