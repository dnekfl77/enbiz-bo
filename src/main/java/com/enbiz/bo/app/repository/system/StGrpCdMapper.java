package com.enbiz.bo.app.repository.system;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;

@Repository
@Lazy
public interface StGrpCdMapper {

	/**
	 * 공통코드 그룹 목록 수 조회
	 * @param GroupCodeRequest
	 * @return
	 */
	int getGrpCdListCount(GroupCodeRequest GroupCodeRequest);

	/**
	 * 공통코드 그룹 목록 조회
	 * @param GroupCodeRequest
	 * @return
	 */
	List<GroupCodeResponse> getStGrpCdList(GroupCodeRequest GroupCodeRequest);

	/**
	 * 그룹코드 중복여부 확인
	 * @param stGrpCd
	 * @return
	 */
	Integer getGrpCdCheck(GroupCodeRequest stGrpCd);

	/**
	 * 그룹코드명 중복여부 확인
	 * @param stGrpCd
	 * @return
	 */
	Integer getGrpCdNmCheck(GroupCodeRequest stGrpCd);

}
