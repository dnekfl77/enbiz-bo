package com.enbiz.bo.app.dto.request.system;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ZipNoMgmtCudRequest extends BaseCommonEntity {

    private Integer zipNoSeq;
    private String ctpNm;
    private String sigNm;
    private String hemdNm;
    private String lnbrMnnm;
    private String lnbrSlno;
    private String roadNm;
    private String buldMnnm;
    private String buldSlno;
    private String bdMgtSn;
    private String posBulNm;
    private String buldDtlNm;

}
