package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpPayMeanCtrlDtlInfo;

@Repository
@Lazy
public interface OpPayMeanCtrlDtlInfoTrxMapper {

	/**
	 * 결제수단 제어관리 팝업 그리드 저장 _ 등록
	 * 
	 * @param opPayMeanCtrlDtlInfo
	 */
	void insertOpPayMeanCtrlDtlInfo(OpPayMeanCtrlDtlInfo opPayMeanCtrlDtlInfo);

	/**
	 * 결제수단 제어관리 팝업 그리드 저장 _ 삭제
	 * 
	 * @param opPayMeanCtrlDtlInfo
	 */
	void deleteOpPayMeanCtrlDtlInfo(OpPayMeanCtrlDtlInfo opPayMeanCtrlDtlInfo);

}
