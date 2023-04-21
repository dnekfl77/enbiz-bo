package com.enbiz.bo.app.dto.request.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 업무연락 문의 목록 조회 팝업 Request Dto
 * ==========================
 */

@Alias("JobCnctListRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCnctListRequest extends BaseCommonEntity {

	private String jobCnctTypeCd;			//업무연락 문의 타입(01:받은문의, 02:보낸문의)
	private String termGbCd;					//기간 구분
	private String searchStartDtm;			//조회 시작 일시
	private String searchEndDtm;			//조회 끝 일시
	private String loginId;						//로그인 한 사용자아이디
	private String searchUserId;				//검색대상자아이디(요청에 따라 발신자 혹은 수신자)
	private String emergYn;						//긴급여부
	private String title;							//제목
	private String cnctPrgsStatCd;			//진행상태(CM016)
	

}
