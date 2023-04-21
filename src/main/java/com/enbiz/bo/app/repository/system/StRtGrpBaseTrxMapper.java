package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StRtGrpBase;

@Repository
@Lazy
public interface StRtGrpBaseTrxMapper {
	/**
	 * 권한 그룹 저장
	 */
	void insertStRtGrpBase(StRtGrpBase stRtGrpBase);
	/**
	 * 권한 그룹 수정
	 */
	void updateStRtGrpBase(StRtGrpBase stRtGrpBase);
}
