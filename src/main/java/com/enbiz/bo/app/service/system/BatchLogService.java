package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.StBatchLogRequest;
import com.enbiz.bo.app.dto.response.system.StBatchLogResponse;


public interface BatchLogService {
	/**
	 * 배치 로그 검색 조건에 부합하는 배치 목록 수 조회
	 * @param StBatchLogRequest
	 * @return 배치 로그 목록
	 * @throws Exception 
	 */
	int getBatchLogListCount(StBatchLogRequest stBatchLogRequest) throws Exception;
	
	/**
	 * 배치 검색 조건에 부합하는 배치 로그 목록 조회
	 * @param StBatchLogRequest
	 * @return StBatchLogResponse list
	 * @throws Exception 
	 */
	List<StBatchLogResponse> getBatchLogList(StBatchLogRequest stBatchLogRequest) throws Exception;
}