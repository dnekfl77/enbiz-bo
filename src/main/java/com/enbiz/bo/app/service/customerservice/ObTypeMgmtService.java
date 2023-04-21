package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsObTypCdRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsObTypCdResponse;
import com.enbiz.bo.app.entity.CsObTypCd;

/**
 * OB유형 서비스
 */
public interface ObTypeMgmtService {
	
	/**
     * OB유형 목록 조회
     * @param csObTypCdRequest
     * @return
     * @throws Exception
     */
	public List<CsObTypCdResponse> getObTypeList(CsObTypCdRequest csObTypCdRequest) throws Exception;

	/**
     *  OB유형 목록 조회 수
     * @param csObTypCdRequest
     * @throws Exception
     */
	public int getObTypeListCount(CsObTypCdRequest csObTypCdRequest) throws Exception;
	
	/**
	 * OB유형 저장
	 */
	public void saveList(List<CsObTypCd> createList,List<CsObTypCd> updateList) throws Exception;
	
	/**
     * OB유형명의 중복여부 확인
     * @param csObTypCdRequest
     * @throws Exception
     */
	public boolean checkObTypNm(CsObTypCdRequest csObTypCdRequest) throws Exception;
	
	/**
     * OB 유형 조회 No Paging
     */
	public List<CsObTypCdResponse> getObTypeNoPagingList(CsObTypCdRequest csObTypCdRequest) throws Exception;
	
}
