package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("RightTargetBaseMenuRequest")
@Getter
@Setter
public class RightTargetBaseMenuRequest extends BaseCommonEntity {
	private String rtGrpNo;//권한그룹번호
 	private String rtTgtSeq;//권한 대상 순번
 	private String rtTgtTypCd;//권한대상유형코드(UR010) 메뉴인지 화면인지 request 인지 버튼인지?
 	private String rtSubGbCd;//권한 주체 구분 코드 UR006 사용자 관리자
 	private String sysGbCd;//시스템구분코드(UR005)
 	private String useYn;
	private String uprRtTgtSeq;//상위권한대상순번
}
