package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrMkdpDivobjInfoResponse")
@Getter
@Setter
public class PrMkdpDivobjInfoResponse extends BaseCommonEntity {

	private String mkdpNo;
	private String divobjNo;
	private String divobjNm;
	private String dispYn;
	private String dispSeq;
	private String tmplNo;
	private String cd;
	private String cdNm;

}