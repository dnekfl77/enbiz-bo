package com.enbiz.bo.app.service.payment;

import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpMersInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpMersInfoResponse;
import com.enbiz.bo.app.entity.OpMersInfo;

/**
 * 가맹점관리 서비스
 */
public interface FranchiseeMgmtService {

	/**
	 * 가맹점관리 목록 조회
	 * 
	 * @return 가맹점관리 목록
	 * @throws Exception
	 */
	List<OpMersInfoResponse> getFranchiseeList(OpMersInfoRequest opMersInfoRequest) throws Exception;

	/**
	 * 가맹점관리 목록 수
	 * 
	 * @return 가맹점관리 목록 수
	 * @throws Exception
	 */
	int getFranchiseeListCount(OpMersInfoRequest opMersInfoRequest) throws Exception;

	/**
	 * 가맹점관리 상세 조회
	 * 
	 * @return 가맹점관리 상세 조회
	 * @throws Exception
	 */
	OpMersInfoResponse franchiseeDetailInfo(OpMersInfoRequest opMersInfoRequest) throws Exception;

	/**
	 * 가맹점관리 상세 조회 _ 사이트 리스트
	 * 
	 * @return 사이트 리스트
	 * @throws Exception
	 */
	List<OpMersInfoResponse> franchiseeSiteList(OpMersInfoRequest opMersInfoRequest) throws Exception;

	/**
	 * 가맹점관리 등록
	 * 
	 * @param opMersInfo
	 * @param opMersInfoRequest
	 * @throws Exception
	 */
	void opMersInfoInsert(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception;

	/**
	 * 가맹점관리 수정
	 * 
	 * @param opMersInfo
	 * @param opMersInfoRequest
	 * @throws Exception
	 */
	void opMersInfoUpdate(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception;

	/**
	 * 적용사이트가맹점정보 저장
	 * 
	 * @param opMersInfo
	 * @param opMersInfoRequest
	 * @throws Exception
	 */
	void saveOpAplySiteMersInfo(OpMersInfo opMersInfo, OpMersInfoRequest opMersInfoRequest) throws Exception;
}
