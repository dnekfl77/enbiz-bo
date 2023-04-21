package com.enbiz.bo.app.dto.request.system;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ReceiveManagerRequest")
@Getter
@Setter
public class ReceiveManagerRequest extends BaseCommonEntity {

	private String recvGrpNo;						//수신그룹번호
	private String userId;							//사용자아이디
	private List<String> recvGrpNoList;		//수신그룹번호 목록

}
