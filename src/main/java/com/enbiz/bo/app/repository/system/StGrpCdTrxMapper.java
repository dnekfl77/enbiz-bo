package com.enbiz.bo.app.repository.system;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StGrpCd;

@Repository
@Lazy
public interface StGrpCdTrxMapper {

	/**
	 * 그룹코드 추가
	 * @param stGrpCd
	 */
	void insertStGrpCd(StGrpCd stGrpCd);

	/**
	 * 그룹코드 수정
	 * @param stGrpCd
	 */
	void updateStGrpCd(StGrpCd stGrpCd);
}
