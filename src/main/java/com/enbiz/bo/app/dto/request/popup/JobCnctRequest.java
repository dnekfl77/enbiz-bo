package com.enbiz.bo.app.dto.request.popup;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 업무연락 상세 팝업 Request Dto
 * ==========================
 */

@Alias("JobCnctRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobCnctRequest extends BaseCommonEntity {

	private String jobCnctTypeCd;		//업무연락 문의 타입(01:받은문의, 02:보낸문의)
	private String jobCnctNo;				//업무연락번호
	private String userId;					//발신자아이디
	private List<String> recvmnIds;	// 수신자아이디(목록)
	private String recvmnId;				//수신자 아이디
	private String emergYn;					//긴급여부
	private String title;						//제목
	private String cont;						//내용
	private String ansCont;					//답변내용
	private String dspRecvGbCd;			//발신수신구분코드

}
