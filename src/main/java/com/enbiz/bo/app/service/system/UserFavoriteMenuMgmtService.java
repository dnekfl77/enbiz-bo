package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.system.UserFavoriteMenuRequest;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.system.UserFavoriteMenuResponse;
import com.enbiz.bo.app.entity.StUserFvtInfo;

public interface UserFavoriteMenuMgmtService {

    /**
     * 즐겨찾기 메뉴 조회
     * @param  userFavoriteMenuRequest
     * @return 즐겨찾기 목록
     * @throws Exception
     */
	List<UserFavoriteMenuResponse> getUserFavoriteMenuList(UserFavoriteMenuRequest userFavoriteMenuRequest);

	/**
     * 즐겨찾기 메뉴 수 조회
     * @param  userFavoriteMenuRequest
     * @return 즐겨찾기 목록 수
     * @throws Exception
     */
	int getUserFavoriteMenuListCount(UserFavoriteMenuRequest userFavoriteMenuRequest);

	/**
	 * 즐겨찾기 메뉴 그리드 저장
	 * @param updateList 수정 목록
	 * @param deleteList 삭제 목록
	 * @throws Exception
	 */
	void saveUserFavoriteMenu(List<StUserFvtInfo> updateList, List<StUserFvtInfo> deleteList) throws Exception;

	/**
     * 즐겨찾기 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
	void modifyUserFavoriteMenu(List<StUserFvtInfo> updateList) throws Exception;

	/**
	 * 즐겨찾기 삭제 처리
	 * @param deleteList 삭제 목록
	 * @throws Exception
	 */
	void deleteUserFavoriteMenu(List<StUserFvtInfo> deleteList) throws Exception;

	/**
	 * 즐겨찾기 중복 확인
	 * @param UserFavoriteMenuRequest
	 * @throws Exception
	 */
	int checkDuplicateUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception;

	/**
	 * 즐겨찾기 등록 처리
	 * @param UserFavoriteMenuRequest 저장 목록
	 * @throws Exception
	 */
	void registUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest) throws Exception;

	/**
	 * 좌측 메뉴 > 마이메뉴 조회
	 * @param topMenuRequest
	 * @return
	 * @throws Exception 
	 */
	List<LeftMenuResponse> getFavoriteMenu(TopMenuRequest topMenuRequest) throws Exception;
}
