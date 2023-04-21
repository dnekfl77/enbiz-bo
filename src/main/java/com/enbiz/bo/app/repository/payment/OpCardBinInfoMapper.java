package com.enbiz.bo.app.repository.payment;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.payment.OpCardBinInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpCardBinInfoResponse;

@Repository
@Lazy
public interface OpCardBinInfoMapper {

	/**
	 * 카드Bin 목록 조회
	 * 
	 * @param opCardBinInfoRequest
	 * @return OpCardBinInfoResponse
	 */
	List<OpCardBinInfoResponse> getCardBinList(OpCardBinInfoRequest opCardBinInfoRequest);

	/**
	 * 카드Bin 목록 수
	 * 
	 * @param opCardBinInfoRequest
	 * @return int
	 */
	int getCardBinListCount(OpCardBinInfoRequest opCardBinInfoRequest);

	/**
	 * Bin번호 중복 여부 확인
	 * 
	 * @param opCardBinInfoRequest
	 * @return
	 */
	int checkCardBinno(OpCardBinInfoRequest opCardBinInfoRequest);

}
