package com.enbiz.bo.app.service.payment;

import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpPgByPayMeanRequest;
import com.enbiz.bo.app.dto.response.payment.OpPgByPayMeanResponse;
import com.enbiz.bo.app.entity.OpPgByPayMean;
import com.enbiz.bo.app.entity.StStdCd;

/**
 * 결제수단관리 서비스
 */
public interface PaymentMeanMgmtService {

	/**
	 * PG사 목록 수
	 * 
	 * @return PG사 목록 수
	 * @throws Exception
	 */
	int getPgListCount() throws Exception;

	/**
	 * PG사 목록 조회
	 * 
	 * @return PG사 목록
	 * @throws Exception
	 */
	List<OpPgByPayMeanResponse> getPgList() throws Exception;

	/**
	 * 결제수단관리 결제수단 목록 조회
	 * 
	 * @return PG사 목록
	 * @throws Exception
	 */
	List<OpPgByPayMeanResponse> getMethodsOfPaymentList(OpPgByPayMeanRequest opPgByPayMeanRequest) throws Exception;

	/**
	 * 결제수단관리 결제수단 목록 수
	 * 
	 * @return 결제수단 목록 수
	 * @throws Exception
	 */
	int getMethodsOfPaymentListCount(OpPgByPayMeanRequest opPgByPayMeanRequest) throws Exception;

	/**
	 * PG사 목록 수정
	 * 
	 * @param updateList
	 */
	void savePgList(List<StStdCd> updateList);

	/**
	 * 결제수단 목록 입력, 수정
	 * 
	 * @param createList
	 * @param updateList
	 * @throws Exception
	 */
	void saveMethodsOfPaymentList(List<OpPgByPayMean> createList, List<OpPgByPayMean> updateList) throws Exception;
}
