package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StBatchLogRequest")
@Getter
@Setter
public class StBatchLogRequest extends BaseCommonEntity {
	private String jobExecutionId;
	private String createTime;
	private String jobName;
	private String status;
	private String exitMessage;
	private String startTime;
	private String endTime;
}