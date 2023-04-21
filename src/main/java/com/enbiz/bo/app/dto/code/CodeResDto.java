package com.enbiz.bo.app.dto.code;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CodeResDto")
@Getter
@Setter
public class CodeResDto {

    private String key;             // 맵의 키(GRP_CD, SITE, ...)
    private String cd;
    private String cdNm;

}
