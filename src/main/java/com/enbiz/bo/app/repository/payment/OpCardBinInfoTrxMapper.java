package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpCardBinInfo;

@Repository
@Lazy
public interface OpCardBinInfoTrxMapper {

	/**
	 * 카드Bin 등록
	 */
	void insertOpCardBinInfo(OpCardBinInfo opCardBinInfo);

	/**
	 * 카드Bin 수정
	 */
	void updateOpCardBinInfo(OpCardBinInfo opCardBinInfo);

	/**
	 * 카드Bin 삭제
	 */
	void deleteOpCardBinInfo(OpCardBinInfo opCardBinInfo);

}
