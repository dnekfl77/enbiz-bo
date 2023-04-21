package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("BadWordMgmtRequest")
@Getter
@Setter
public class BadWordMgmtRequest extends BaseCommonEntity {

    private	String	bwSeq;	//금칙어순번
    @NotEmpty(message = "badWordMgmt.badword.name.invalid.input")
    @NotNull(message = "badWordMgmt.badword.name.invalid.input")
    private	String	bwNm;	//금칙어명
    private	String	bwDesc;	//금칙어설명
    private	String	useYn;	//사용여부

}
