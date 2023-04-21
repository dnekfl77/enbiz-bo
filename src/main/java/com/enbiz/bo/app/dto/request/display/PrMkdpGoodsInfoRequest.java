package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Alias("PrMkdpGoodsInfoRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrMkdpGoodsInfoRequest extends BaseCommonEntity {

	private String mkdpNo;				// 기획전번호
	private String divobjNo;			// 구분자번호
}