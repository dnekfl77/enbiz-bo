package com.enbiz.bo.app.dto.request.system;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.entity.StUserBase;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModifySystemNoticeRequest {
	private SystemNoticeCudRequest req;
	private RealGridCUDRequest<StUserBase> cudList;
}
