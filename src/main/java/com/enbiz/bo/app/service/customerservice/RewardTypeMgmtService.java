package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsCompensTypeCodeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCompensTypeCodeResponse;
import com.enbiz.bo.app.entity.CsCpnsTypCd;

/**
 * 보상유형관리
 */
public interface RewardTypeMgmtService {
	/**
     * 보상유형 관리 Tree 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
	public List<CsCompensTypeCodeResponse> getRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;
	
	/**
     * 보상유형관리 하위 보상 정보 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
	public List<CsCompensTypeCodeResponse> getLowerRewardTypeList(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;
	
	/**
     *  보상유형관리 하위 보상 정보 목록 조회 수
     * @param CsCompensTypeCodeRequest
     * @throws Exception
     */
	public int getLowerRewardTypeListCount(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;
	
	/**
     * 보상유형관리 하위 보상 정보 등록,보상유형관리 하위 보상 정보 업데이트
     * @param createList
     * @throws Exception
     */
	public void saveRewardTypeList(List<CsCpnsTypCd> createList, List<CsCpnsTypCd> updateList) throws Exception;
	
	/**
     * 보상유형조회 팝업 목록 조회
     * @param CsCompensTypeCodeRequest
     * @return
     * @throws Exception
     */
	public List<CsCompensTypeCodeResponse> getCsCompensTypeCodePopup(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;
	
	/**
     *  보상유형조회 팝업 조회 수
     * @param CsCompensTypeCodeRequest
     * @throws Exception
     */
	public int getCsCompensTypeCodePopupCount(CsCompensTypeCodeRequest CsCompensTypeCodeRequest) throws Exception;
}
