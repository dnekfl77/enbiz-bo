package com.enbiz.bo.app.service.payment;

import java.util.List;

import com.enbiz.bo.app.dto.request.payment.OpCardBinInfoRequest;
import com.enbiz.bo.app.dto.response.payment.OpCardBinInfoResponse;
import com.enbiz.bo.app.entity.OpCardBinInfo;

/**
 * 카드Bin관리 서비스
 */
public interface CardBinMgmtService {

	/**
	 * 카드Bin 목록 조회
	 * 
	 * @param opCardBinInfoRequest
	 * @return 카드Bin 목록
	 * @throws Exception
	 */
	List<OpCardBinInfoResponse> getCardBinList(OpCardBinInfoRequest opCardBinInfoRequest) throws Exception;

	/**
	 * 카드Bin 목록 수
	 * 
	 * @param opCardBinInfoRequest
	 * @return 카드Bin 목록 수
	 * @throws Exception
	 */
	int getCardBinListCount(OpCardBinInfoRequest opCardBinInfoRequest) throws Exception;

	/**
	 * 카드Bin 목록 저장
	 * 
	 * @param createList 신규 목록
	 * @param updateList 수정 목록
	 * @param deleteList 삭제 목록
	 * @throws Exception
	 */
	void registCUD(List<OpCardBinInfo> createList, List<OpCardBinInfo> updateList, List<OpCardBinInfo> deleteList) throws Exception;

	/**
	 * 카드Bin 등록
	 * 
	 * @param createList
	 * @throws Exception
	 */
	void insertOpCardBinInfo(List<OpCardBinInfo> createList) throws Exception;

	/**
	 * 카드Bin 수정
	 * 
	 * @param updateList
	 * @throws Exception
	 */
	void updateOpCardBinInfo(List<OpCardBinInfo> updateList) throws Exception;

	/**
	 * 카드Bin 삭제
	 * 
	 * @param deleteList
	 * @throws Exception
	 */
	void deleteOpCardBinInfo(List<OpCardBinInfo> deleteList) throws Exception;

	/**
	 * Bin번호 중복 여부 확인
	 * 
	 * @param opCardBinInfoRequest
	 * @return
	 */
	boolean checkCardBinno(OpCardBinInfoRequest opCardBinInfoRequest);

}
