package com.enbiz.bo.app.dto.response.system;

import java.util.List;

import com.enbiz.bo.app.entity.StSysBbInfo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemNoticeInfoResponse {
	private StSysBbInfo stSysBbInfo;
    private List<SystemNoticeAttachFileResponse> atchFileList;
}
