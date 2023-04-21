package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.RightGroupBaseRequest;
import com.enbiz.bo.app.dto.response.system.RightGroupBaseResponse;

@Repository
@Lazy
public interface StRtGrpBaseMapper {
	/**
	 * 권한 그룹 리스트 조회
	 */
	List<RightGroupBaseResponse> getStRtGrpBaseList(RightGroupBaseRequest RightGroupBaseRequest);
	/**
	 * 권한 그룹 리스트 전체수 조회
	 */
	int getStRtGrpBaseListCount(RightGroupBaseRequest RightGroupBaseRequest);
}
