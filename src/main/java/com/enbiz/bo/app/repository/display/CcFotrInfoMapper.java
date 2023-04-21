package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.CcFotrInfoRequest;
import com.enbiz.bo.app.dto.response.display.CcFotrInfoResponse;

import java.util.List;

@Repository
@Lazy
public interface CcFotrInfoMapper {

	/**
	 * 푸터 관리 - 그룹 목록 수 조회
	 * @param ccFotrInfoRequest
	 * @return
	 */
	int getCcFotrInfoGrpListCount(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

	/**
	 * 푸터 관리 - 그룹 목록 조회
	 * @param ccFotrInfoRequest
	 * @return
	 */
	List<CcFotrInfoResponse> getCcFotrInfoGrpList(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

	/**
	 * 푸터 관리 - 푸터 컨텐츠 조회
	 * @param ccFotrInfoRequest
	 * @return
	 */
	CcFotrInfoResponse getFooterMgmtCont(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

	/**
	 * 푸터 관리 - 메뉴 목록 조회
	 * @param ccFotrInfoRequest
	 * @return
	 */
	int getCcFotrInfoMenuListCount(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

	/**
	 * 푸터 관리 - 메뉴 목록 조회
	 * @param ccFotrInfoRequest
	 * @return
	 */
	List<CcFotrInfoResponse> getCcFotrInfoMenuList(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;
}