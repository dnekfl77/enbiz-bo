package com.enbiz.bo.app.dto.request.system;

import java.util.List;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StUserFvtInfoCUDRequest extends BaseCommonEntity {
	private List<StUserFvtInfoExRequest> updateList;
	private List<StUserFvtInfoExRequest> deleteList;
}
