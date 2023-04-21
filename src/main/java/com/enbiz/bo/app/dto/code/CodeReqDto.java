package com.enbiz.bo.app.dto.code;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("CodeReqDto")
@Getter
@Setter
public class CodeReqDto {

    private String code;            // 부모코드
    private String referCode;       // reference 코드
    private String type;            // 타입
    private String grpCds;

}
