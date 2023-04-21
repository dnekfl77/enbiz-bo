package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.menu.TopMenuRequest;
import com.enbiz.bo.app.dto.request.system.UserFavoriteMenuRequest;
import com.enbiz.bo.app.dto.response.menu.LeftMenuResponse;
import com.enbiz.bo.app.dto.response.system.UserFavoriteMenuResponse;

@Repository
@Lazy
public interface StUserFvtInfoMapper {

	/**
	 * 즐겨찾기 메뉴 조회
	 * @param userFavoriteMenuRequest
	 * @return
	 */
	List<UserFavoriteMenuResponse> getUserFavoriteMenuList(UserFavoriteMenuRequest userFavoriteMenuRequest);

	/**
	 * 즐겨찾기 메뉴 수 조회
	 * @param userFavoriteMenuRequest
	 * @return
	 */
	int getUserFavoriteMenuListCount(UserFavoriteMenuRequest userFavoriteMenuRequest);

	/**
	 * 즐겨찾기 중복 확인
	 * @param UserFavoriteMenuRequest
	 */
	int checkDuplicateUserFavoriteMenu(UserFavoriteMenuRequest UserFavoriteMenuRequest);

	/**
	 * 좌측 메뉴 > 마이메뉴 조회
	 * @param topMenuRequest
	 * @return
	 */
	List<LeftMenuResponse> getFvtMenuList(TopMenuRequest topMenuRequest);
}
