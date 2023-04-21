package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrDispImgInfo")
@Getter
@Setter
public class PrDispImgInfo extends BaseCommonEntity {

    private String dispShopGbCd;			// 전시매장구분코드(DP009)
    private String shopCtgNo;				// 매장카테고리번호
    private String imgTypCd;				// 이미지유형코드(DP013)
    private String imgSn;					// 이미지일련번호
    private String bnrImgPathNm;			// 배너이미지경로명
    private String bnrImgFileNm;			// 배너이미지파일명
    private String linkUrlAddr;				// 연결URL주소

    private String dispStat;			// 기획전상태(10:준비중, 20:진행중, 30:완료)

    private String startDate;			// 기획전 관리 조회 조건 _ 전시시작기간
    private String endDate;				// 기획전 관리 조회 조건 _ 전시종료기간
    private String userId;				// 기획전 관리 조회 조건 _ 등록자 ID
    private String imgTypCd1;			// 이미지유형코드(DP013) _ 기획전배너
    private String imgTypCd2;			// 이미지유형코드(DP013) _ 기획전모바일배너

}
