package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.LoginLogRequest;
import com.enbiz.bo.app.dto.response.system.LoginLogResponse;

@Repository
@Lazy
public interface StLoginLogMapper {

    /**
     * 사용자접속 이력관리 페이지 - 사용자별 최종로그인정보 Grid count 조회
     * @param LoginLogRequest
     * @return
     * @throws Exception
     */
    int getLastLoginInfoListCount(LoginLogRequest LoginLogRequest) throws Exception;

    /**
     * 사용자접속 이력관리 페이지 - 사용자별 최종로그인정보 Grid 조회
     * @param LoginLogRequest
     * @return
     * @throws Exception
     */
    List<LoginLogResponse> getLastLoginInfoList(LoginLogRequest LoginLogRequest) throws Exception;

    /**
     * 사용자접속 이력관리 페이지 - 상세로그인이력 Grid 조회 count 조회
     * @param LoginLogRequest
     * @return
     * @throws Exception
     */
    int getDetailLoginHistoryListCount(LoginLogRequest LoginLogRequest) throws Exception;

    /**
     * 사용자접속 이력관리 페이지 - 상세로그인이력 Grid 조회 Grid 조회
     * @param LoginLogRequest
     * @return
     * @throws Exception
     */
    List<LoginLogResponse> getDetailLoginHistoryList(LoginLogRequest LoginLogRequest) throws Exception;

}