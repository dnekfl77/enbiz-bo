package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("HolidayMgmtRequest")
@Getter
@Setter
public class HolidayMgmtRequest extends BaseCommonDto {
    @NotEmpty
    private	String	holiDt;
    @NotEmpty
    private	String	holiJobGbCd;
    @NotEmpty
    private	String	holiGbCd;
    @NotEmpty
    private	String	useYn;
    private	String	holiMemo;
}
