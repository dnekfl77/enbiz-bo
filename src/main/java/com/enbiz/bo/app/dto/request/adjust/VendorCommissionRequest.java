package com.enbiz.bo.app.dto.request.adjust;


import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("VendorCommissionRequest")
@Getter
@Setter
public class VendorCommissionRequest extends BaseCommonEntity {
	private String startDate;		//매출일자
	private String endDate;
	private String adjCloseYn;		//매출마감여부
	private String entrNo;			//협력사
}
