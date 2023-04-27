package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.RightGroupBaseRequest;
import com.enbiz.bo.app.dto.request.system.RightTargetBaseMenuRequest;
import com.enbiz.bo.app.dto.response.system.RightGroupBaseResponse;
import com.enbiz.bo.app.dto.response.system.RightTargetBaseMenuResponse;

public interface RightGroupMgmtService {
	 /**
     * 권한 그룹 목록 조회
     * @param  RightGroupBaseRequest
     * @return 권한 그룹 목록
     * @throws Exception
     */
	List<RightGroupBaseResponse> getRightGroupBaseList(RightGroupBaseRequest RightGroupBaseRequest) throws Exception;

	/**
     * 권한 그룹 목록 수 조회
     * @param  RightGroupBaseRequest
     * @return 권한 그룹 목록 수
     * @throws Exception
     */
	int getRightGroupBaseListCount(RightGroupBaseRequest RightGroupBaseRequest) throws Exception;

	/**
     * 권한 그룹 저장 처리
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @throws Exception
     */
    void saveRightGroupBaseList(RealGridCUDRequest<RightGroupBaseRequest> realGridCUD) throws Exception;
	
    /**
     * 권한 그룹 메뉴 조회
     * @param  stRtTgtMenuRequest
     * @return 권한 그룹 목록
     * @throws Exception
     */
	List<RightTargetBaseMenuResponse> getRightTargetBaseMenuList(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception;

	/**
     * 권한 그룹 메뉴 수 조회
     * @param  stRtTgtMenuRequest
     * @return 권한 그룹 목록 수
     * @throws Exception
     */
	int getRightTargetBaseMenuListCount(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception;

	/**
	 * 권한 그룹 메뉴 저장 처리
	 * @param updateList 수정 목록
	 * @throws Exception
	 */
	void saveRightTargetBaseMenu(List<RightTargetBaseMenuRequest> updateList) throws Exception;

	/**
     * 권한 그룹 버튼 조회
     * @param  stRtTgtMenuRequest
     * @return 권한 그룹 버튼 조회
     * @throws Exception
     */
	List<RightTargetBaseMenuResponse> getRightGroupButtonList(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception;

	/**
     * 권한 그룹 버튼 수 조회
     * @param  stRtTgtMenuRequest
     * @return 권한 그룹 버튼 수 조회
     * @throws Exception
     */
	int getRightGroupButtonListCount(RightTargetBaseMenuRequest stRtTgtMenuRequest) throws Exception;

}
