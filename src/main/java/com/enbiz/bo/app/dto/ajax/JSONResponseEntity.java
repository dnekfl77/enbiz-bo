package com.enbiz.bo.app.dto.ajax;

import java.io.Serializable;

import com.enbiz.common.base.constant.BaseConstants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@SuppressWarnings("unchecked")
public class JSONResponseEntity<T> implements Serializable {
	private static final long serialVersionUID = -4245180745017384477L;

	protected String message = BaseConstants.EMPTY;
	protected T data = (T) BaseConstants.EMPTY;
	protected boolean succeeded = true;

	public JSONResponseEntity() {
		this(BaseConstants.EMPTY, (T) BaseConstants.EMPTY, true);
	}

	public JSONResponseEntity(String message) {
		this(message, (T) BaseConstants.EMPTY, true);
	}

	public JSONResponseEntity(String message, T data) {
		this(message, (T) data, true);
	}

	public JSONResponseEntity(String message, boolean succeeded) {
		this(message, (T) BaseConstants.EMPTY, succeeded);
	}

}