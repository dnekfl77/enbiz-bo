package com.enbiz.bo.base.advice;

import com.enbiz.common.base.exception.AppError;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AdminError implements AppError {
	SUCCESS("0000", "adminCommon.message.saved.successfully"),
	// unknow error
	UNKNOWN("9000", "common.error.unknown");

	private final String code;
	private final String messageKey;

}
