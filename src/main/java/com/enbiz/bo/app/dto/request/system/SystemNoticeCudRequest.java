package com.enbiz.bo.app.dto.request.system;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SystemNoticeCudRequest extends BaseCommonEntity {
    private String bbcNo;
    @NotEmpty
    private String sysGbCd;
    private String sysGbDtlCd;
    @NotEmpty
    private String bbGbCd;
    @NotEmpty
    private String title;
    @NotEmpty
    private String fxdcYn;
    private String ntcGbCd;
    private String ntcTypCd;
    @NotEmpty
    private String smsSndYn;
    @NotEmpty
    private String emailSndYn;
    @NotEmpty
    private String bbYn;
    private String bbStrDtm;
    private String bbEndDtm;
    @NotEmpty
    private String popYn;
    private String popBbStrDtm;
    private String popBbEndDtm;
    @NotEmpty
    private String bbcCont;
    private Integer qryCnt;
    private List<SystemNoticeFileCudRequest> tmpFileList;
    private List<SystemNoticeFileCudRequest> delFileList;
}
