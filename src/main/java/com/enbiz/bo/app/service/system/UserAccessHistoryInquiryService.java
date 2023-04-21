package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.LoginLogRequest;
import com.enbiz.bo.app.dto.response.system.LoginLogResponse;

public interface UserAccessHistoryInquiryService {
    /**
     * 사용자접속 이력관리 페이지 - 사용자별 최종로그인정보 Grid count 조회
     * @param stlogLoginLogRequest
     * @return
     * @throws Exception
     */
    int getLastLoginInfoListCount(LoginLogRequest stlogLoginLogRequest) throws Exception;

    /**
     * 사용자접속 이력관리 페이지 - 사용자별 최종로그인정보 Grid 조회
     * @param stlogLoginLogRequest
     * @return
     * @throws Exception
     */
    List<LoginLogResponse> getLastLoginInfoList(LoginLogRequest stlogLoginLogRequest) throws Exception;

    /**
     * 사용자접속 이력관리 페이지 - 상세로그인이력 Grid 조회 count 조회
     * @param stlogLoginLogRequest
     * @return
     * @throws Exception
     */
    int getDetailLoginHistoryListCount(LoginLogRequest stlogLoginLogRequest) throws Exception;

    /**
     * 사용자접속 이력관리 페이지 - 상세로그인이력 Grid 조회 Grid 조회
     * @param stlogLoginLogRequest
     * @return
     * @throws Exception
     */
    List<LoginLogResponse> getDetailLoginHistoryList(LoginLogRequest stlogLoginLogRequest) throws Exception;

}