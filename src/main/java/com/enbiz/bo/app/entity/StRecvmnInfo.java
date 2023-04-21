package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StRecvmnInfo")
@Getter
@Setter
public class StRecvmnInfo extends BaseCommonEntity {

	private String recvGrpNo;		//수신그룹번호
	private String userId;			//사용자아이디

}
