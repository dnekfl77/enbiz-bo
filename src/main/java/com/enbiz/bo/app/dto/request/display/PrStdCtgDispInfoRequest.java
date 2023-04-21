package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrStdCtgDispInfoRequest")
@Getter
@Setter
public class PrStdCtgDispInfoRequest extends BaseCommonEntity {
	private String stdCtgNo;			// 표준카테고리번호
	private String dispCtgNo;			// 전시카테고리번호
	private String repCtgYn;			// 대표카테고리여부
	private String useYn;				// 사용여부
}
