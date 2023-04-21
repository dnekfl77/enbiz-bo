package com.enbiz.bo.app.dto.request.system;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("receiveGroupRequest")
@Getter
@Setter
public class ReceiveGroupRequest extends BaseCommonEntity {

    @NotNull
    @NotEmpty
    String argSelectType ;  //선택구분 ( 1 : 단일 , N : 다중 )
    
	private String recvGrpNo;		//수신그룹번호
	private String recvGrpNm;		//수신그룹명
	private String pblYn;				//공개여부
	private String useYn;				//사용여부

}
