package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("RtTargetBaseLogRequest")
@Getter
@Setter
public class RtTargetBaseLogRequest extends BaseCommonEntity {
	private String userId;
	private String sysGbCd;			//시스템구분코드(UR005)
	private String userIdConditionParam;
	private String userNmConditionParam;
	private String useStrtDtm;
	private String userEndDtm;
	private String rtTgtNm;
}
