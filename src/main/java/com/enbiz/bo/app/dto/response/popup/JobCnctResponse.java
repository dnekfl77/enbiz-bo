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
 *  * 업무연락 상세 팝업 Response Dto
 * ==========================
 */

@Alias("JobCnctResponse")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCnctResponse extends BaseCommonEntity {

	private String jobCnctNo;			//업무연락번호
	private String cnctPrgsStatCd;	//업무진행상태코드
	private String title;					//문의제목
	private String cont;					//문의내용
	private String ansCont;				//답변내용
	private String userId;				//발신자아이디
	private String user;					//발신자명
	private String userDept;			//발신자부서명
	private String recvmnId;			//수신자아이디
	private String recvmn;				//수신자명
	private String recvmnDept;		//수신자부서명
	private String recvDtm;				//수신일시
	private String sendDtm;			//발신일시
	private String qryDtm;				//조회일시
	private String ansDtm;				//답변일시
	private String dsmnAnsConfYn;	//발신자답변확인여부
	private String dsmnAnsConfDtm;//발신자답변확인일시
	private String atchFileRouteNm;//첨부파일경로명
	private String atchFileNm;			//첨부파일명
	
	
}
