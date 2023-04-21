package com.enbiz.bo.app.service.payment;

import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlDtlInfoRequest;
import com.enbiz.bo.app.dto.request.payment.OpPayMeanCtrlInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpPayMeanCtrlInfoResponse;
import com.enbiz.bo.app.entity.OpPayMeanCtrlDtlInfo;
import com.enbiz.bo.app.entity.OpPayMeanCtrlInfo;

/**
 * 결제수단 제어관리 서비스
 */
public interface PaymentMeanControlMgmtService {

	/**
	 * 결제수단 제어 목록 조회
	 * 
	 * @return 결제수단 제어 목록
	 * @throws Exception
	 */
	List<OpPayMeanCtrlInfoResponse> getMethodsOfPaymentControlList(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception;

	/**
	 * 결제수단 제어관리 상세 _ 제어 목록 수
	 * 
	 * @return 상세 _ 제어 목록 수
	 * @throws Exception
	 */
	int getMethodsOfPaymentControlListCount(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception;

	/**
	 * 결제수단 제어관리 상세 정보, 안내공지 조회
	 * 
	 * @return 상세 제어 조회
	 * @throws Exception
	 */
	OpPayMeanCtrlInfoResponse methodsOfPaymentControlDetailInfo(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception;

	/**
	 * 결제수단 제어관리 상세 _ 제어 목록 조회
	 * 
	 * @return 상세 제어 목록 조회
	 * @throws Exception
	 */
	List<OpPayMeanCtrlInfoResponse> getMethodsOfPaymentControlDetail(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception;

	/**
	 * 결제수단 제어 목록 수
	 * 
	 * @return 결제수단 제어 목록 수
	 * @throws Exception
	 */
	int getMethodsOfPaymentControlDetailCount(OpPayMeanCtrlInfoRequest opPayMeanCtrlInfoRequest) throws Exception;

	/**
	 * 결제수단 제어관리 팝업 저장 _ 등록
	 * 
	 * @param opPayMeanCtrlInfo
	 * @return 결제수단제어번호
	 * @throws Exception
	 */
	void opPayMeanCtrlInfoInsert(OpPayMeanCtrlInfo opPayMeanCtrlInfo) throws Exception;

	/**
	 * 결제수단 제어관리 팝업 저장 _ 수정
	 * 
	 * @param opPayMeanCtrlInfo
	 * @return 결제수단제어번호
	 * @throws Exception
	 */
	void opPayMeanCtrlInfoUpdate(OpPayMeanCtrlInfo opPayMeanCtrlInfo) throws Exception;

	/**
	 * 결제수단 제어관리 팝업 그리드 저장 _ 등록, 삭제
	 * 
	 * @param payMeanCtrlNo
	 * @param opPayMeanCtrlDtlInfoRequest
	 * @throws Exception
	 */
	void registCUD(String payMeanCtrlNo, OpPayMeanCtrlDtlInfoRequest opPayMeanCtrlDtlInfoRequest) throws Exception;
}
