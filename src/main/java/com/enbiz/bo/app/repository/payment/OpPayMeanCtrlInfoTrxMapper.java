package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpPayMeanCtrlInfo;

@Repository
@Lazy
public interface OpPayMeanCtrlInfoTrxMapper {

	/**
	 * 결제수단 제어관리 저장 _ 등록
	 * 
	 * @return int
	 */
	void opPayMeanCtrlInfoInsert(OpPayMeanCtrlInfo opPayMeanCtrlInfo);

	/**
	 * 결제수단 제어관리 저장 _ 수정
	 * 
	 * @return int
	 */
	void opPayMeanCtrlInfoUpdate(OpPayMeanCtrlInfo opPayMeanCtrlInfo);

}
