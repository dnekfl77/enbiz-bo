package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StandardCodeRequest")
@Getter
@Setter
public class StandardCodeRequest extends BaseCommonEntity {

    @NotNull
    @NotEmpty
    private String grpCd    ; // 그룹코드
    @NotNull
    @NotEmpty
    private String cd       ; // 코드
    @NotNull
    @NotEmpty
    private String cdNm     ; // 코드명
    private String cdDesc   ; // 코드설명
    private String useYn    ; // 사용여부
    @NotNull
    @NotEmpty
    private Integer sortSeq ; // 정렬순서
    private String ref1Val  ; // 참조1값
    private String ref2Val  ; // 참조2값
    private String ref3Val  ; // 참조3값
    private String ref4Val  ; // 참조4값
    private String ref5Val  ; // 참조5값

    private String grpSctCd;
    private String grpSctNm;
    private String mppgCdVal;
    private String cdPathAddr;
}
