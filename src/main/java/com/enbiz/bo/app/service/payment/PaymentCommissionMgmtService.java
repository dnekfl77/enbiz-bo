package com.enbiz.bo.app.service.payment;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpCmsnInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpCmsnInfoResponse;
import com.enbiz.bo.app.entity.OpCmsnInfo;

/**
 * 결제수수료관리 서비스
 */
public interface PaymentCommissionMgmtService {

	/**
	 * 결제수수료관리 목록 조회
	 * 
	 * @param opCmsnInfoRequest
	 * @return 결제수수료관리 목록
	 * @throws Exception
	 */
	List<OpCmsnInfoResponse> getClearingCommissionList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception;

	/**
	 * 결제수수료관리 목록 수
	 * 
	 * @param opCmsnInfoRequest
	 * @return 결제수수료관리 목록 수
	 * @throws Exception
	 */
	int getClearingCommissionListCount(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception;

	/**
	 * 결제수수료관리 상세목록 조회
	 * 
	 * @param opCmsnInfoRequest
	 * @return 결제수수료관리 상세목록
	 * @throws Exception
	 */
	OpCmsnInfoResponse getClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception;

	/**
	 * 결제수수료관리 가맹점 전체 리스트 조회
	 * 
	 * @return 가맹점 전체 리스트 조회
	 * @throws Exception
	 */
	List<OpCmsnInfoResponse> getMersTotalList() throws Exception;

	/**
	 * 결제수수료관리 가맹점 선택 리스트 조회
	 * 
	 * @param opCmsnInfoRequest
	 * @return 가맹점 선택 리스트 조회
	 * @throws Exception
	 */
	List<OpCmsnInfoResponse> getMappingMersList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception;

	/**
	 * 수수료율 적용 개월별 리스트
	 * 
	 * @param opCmsnInfoRequest
	 * @return 수수료율 적용 개월별 리스트
	 * @throws Exception
	 */
	List<OpCmsnInfoResponse> getMonthList(OpCmsnInfoRequest opCmsnInfoRequest) throws Exception;

	/**
	 * 적용기간 중복 여부 확인
	 * 
	 * @param opCmsnInfoRequest
	 * @return
	 */
	boolean aplyDateCheck(OpCmsnInfoRequest opCmsnInfoRequest) throws ParseException;

	/**
	 * 결제수수료관리 상세 저장
	 * 
	 * @param opCmsnInfoRequest
	 * @param opCmsnInfo
	 * @return 결제수수료관리 상세 저장
	 * @throws Exception
	 */
	void saveClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest, OpCmsnInfo opCmsnInfo) throws Exception;

	/**
	 * 결제수수료관리 상세 등록
	 * 
	 * @param opCmsnInfoRequest
	 * @param opCmsnInfo
	 * @return 결제수수료관리 상세 등록
	 * @throws Exception
	 */
	void insertClearingCommissionDetail(OpCmsnInfoRequest opCmsnInfoRequest, OpCmsnInfo opCmsnInfo) throws Exception;

	/**
	 * 결제수수료관리 상세 수정
	 * 
	 * @param newStrDate
	 * @param aplyStrDate
	 * @param aplyEndDate
	 * @param opCmsnInfoRequest
	 * @return 결제수수료관리 상세 수정
	 * @throws Exception
	 */
	void updateClearingCommissionDetail(Date newStrDate, Date aplyStrDate, Date aplyEndDate, OpCmsnInfoRequest opCmsnInfoRequest) throws Exception;

}
