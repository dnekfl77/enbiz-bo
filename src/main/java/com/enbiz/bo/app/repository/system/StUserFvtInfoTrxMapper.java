package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StUserFvtInfo;

@Repository
@Lazy
public interface StUserFvtInfoTrxMapper {

	/**
	 * 즐겨찾기 등록
	 * @param stUserFvtInfo
	 */
	void insertStUserFvtInfo(StUserFvtInfo stUserFvtInfo);

	/**
	 * 즐겨찾기 수정
	 * @param stUserFvtInfo
	 */
	void updateStUserFvtInfo(StUserFvtInfo stUserFvtInfo);

	/**
	 * 즐겨찾기 삭제
	 * @param stUserFvtInfo
	 */
	void deleteStUserFvtInfo(StUserFvtInfo stUserFvtInfo);
}
