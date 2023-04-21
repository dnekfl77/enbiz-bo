package com.enbiz.bo.app.dto.response.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ReceiveManagerResponse")
@Getter
@Setter
public class ReceiveManagerResponse extends BaseCommonEntity {
	
	private String recvGrpNo;		//수신그룹번호
	private String userId;			//사용자아이디
	private String userNm;			//사용자명
	private String deptNm;			//부서명
	private String jobGrpNm;		//업무그룹명
	
}
