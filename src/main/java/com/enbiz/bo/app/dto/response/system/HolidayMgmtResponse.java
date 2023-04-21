package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Alias("HolidayMgmtResponse")
@Getter
@Setter
public class HolidayMgmtResponse extends BaseCommonDto {
    private	String	holiDt;
    private	String	holiJobGbCd;
    private	String	holiGbCd;
    private	String	useYn;
    private	String	holiMemo;
}
