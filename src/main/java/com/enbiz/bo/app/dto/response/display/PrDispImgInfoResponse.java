package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Alias("PrDispImgInfoResponse")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrDispImgInfoResponse extends BaseCommonEntity {
	
	private String dispShopGbCd;			// 전시매장구분코드(DP009)
	private String shopCtgNo;				// 매장카테고리번호
	private String imgTypCd;				// 이미지유형코드(DP013)
	private String imgSn;					// 이미지일련번호
	private String bnrImgPathNm;			// 배너이미지경로명
	private String bnrImgFileNm;			// 배너이미지파일명
	private String linkUrlAddr;				// 연결URL주소

}