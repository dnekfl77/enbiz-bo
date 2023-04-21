package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 *  * 업무연락 문의 목록 조회 팝업 Request Dto
 * ==========================
 */

@Alias("JobCnctListResponse")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCnctListResponse extends BaseCommonEntity {

	private String jobCnctNo;			//업무연락번호
	private String title;					//제목
	private String cnctPrgsStatCd;	//업무진행상태코드
	private String cnctPrgsStatNm;	//업무진행상태명
	private String userId;				//발신자아이디
	private String user;					//발신자
	private String userDept;			//발신자부서명
	private String recvmnId;			//수신자아이디
	private String recvmn;				//수신자
	private String recvmnDept;		//수신자부서명
	private String emergYn;				//긴급여부
	private String recvDtm;				//수신일시
	private String sendDtm;			//발신일시
	private String ansDtm;				//답변일시
	
}
