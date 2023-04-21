package com.enbiz.bo.app.service.payment;

import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpNintInstGdBaseRequest;
import com.enbiz.bo.app.dto.response.payment.OpNintInstGdBaseResponse;
import com.enbiz.bo.app.entity.OpNintInstGdBase;

/**
 * 무이자 할부 안내관리 서비스
 */
public interface NoInterestInstallmentGuideMgmtService {

	/**
	 * 무이자 할부 안내관리 _ 가맹점 정보 목록
	 * 
	 * @return 가맹점 정보 목록
	 * @throws Exception
	 */
	List<OpNintInstGdBaseResponse> getMersList() throws Exception;

	/**
	 * 무이자 할부 안내관리 목록 조회
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return 무이자 할부 안내관리 목록
	 * @throws Exception
	 */
	List<OpNintInstGdBaseResponse> getInterestFreeInstallmentInfoList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception;

	/**
	 * 무이자 할부 안내관리 목록 수
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return 무이자 할부 안내 목록 수
	 * @throws Exception
	 */
	int getInterestFreeInstallmentInfoListCount(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception;

	/**
	 * 무이자 할부 안내 상세
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return 무이자 할부 안내 상세
	 * @throws Exception
	 */
	OpNintInstGdBaseResponse getInterestFreeInstallmentInfoDetail(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception;

	/**
	 * 무이자 할부 안내관리 _ 가맹점 전체 목록 조회
	 * 
	 * @return 가맹점 전체 목록 조회
	 * @throws Exception
	 */
	List<OpNintInstGdBaseResponse> getTotalMersList() throws Exception;

	/**
	 * 무이자 할부 안내관리 _ 가맹점 전체 목록 수
	 * 
	 * @return 가맹점 전체 목록 수
	 * @throws Exception
	 */
	int getTotalMersListCount() throws Exception;

	/**
	 * 무이자 할부 안내 상세
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return 무이자 할부 안내 상세
	 * @throws Exception
	 */
	List<OpNintInstGdBaseResponse> getDetailList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception;

	/**
	 * 무이자할부안내가맹점정보
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return 무이자할부안내가맹점정보
	 * @throws Exception
	 */
	OpNintInstGdBaseResponse getMappingMersList(OpNintInstGdBaseRequest opNintInstGdBaseRequest) throws Exception;

	/**
	 * 적용기간 내 매입사 중복 여부 확인
	 * 
	 * @param opNintInstGdBaseRequest
	 * @return
	 */
	boolean getAcqrCheck(OpNintInstGdBaseRequest opNintInstGdBaseRequest);

	/**
	 * 무이자 할부 안내관리 등록, 수정
	 * 
	 * @param opNintInstGdBaseRequest
	 * @param opNintInstGdBase
	 * @throws Exception
	 */
	void saveFranchiseeInstallment(OpNintInstGdBaseRequest opNintInstGdBaseRequest, OpNintInstGdBase opNintInstGdBase) throws Exception;

	/**
	 * 무이자 할부 안내관리 삭제
	 * 
	 * @param opNintInstGdBase
	 * @throws Exception
	 */
	void deleteFranchiseeInstallment(OpNintInstGdBase opNintInstGdBase) throws Exception;

}
