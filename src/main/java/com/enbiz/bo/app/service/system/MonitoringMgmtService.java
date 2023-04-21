package com.enbiz.bo.app.service.system;


import java.util.List;

import com.enbiz.bo.app.entity.BatchJob;
import com.enbiz.bo.app.entity.BatchJobExecutionEx;
import com.enbiz.bo.app.entity.BatchJobExecutionParams;
import com.enbiz.bo.app.entity.BatchStepExecution;
import com.enbiz.bo.app.entity.StBatchLogEx;
import com.enbiz.bo.app.entity.StLinkLogEx;
import com.enbiz.bo.app.entity.StRtTgtBase;
import com.enbiz.bo.app.entity.StRtTgtBaseLog;
import com.enbiz.bo.app.entity.StUsrWkLog;
import com.enbiz.bo.app.entity.StUsrWkLogEx;


public interface MonitoringMgmtService {
    /**
     * 배치/연동 로그관리 페이지 - 배치로그 Grid count 조회
     *
     * @param stBatchLogEx
     * @return
     * @throws Exception
     */
    int getBatchLogListCount(StBatchLogEx stBatchLogEx) throws Exception;

    /**
     * 배치/연동 로그관리 페이지 - 배치로그 Grid 조회<br>
     *
     * @param stBatchLogEx
     * @return
     * @throws Exception
     */
    List<StBatchLogEx> getBatchLogList(StBatchLogEx stBatchLogEx) throws Exception;

    /**
     * 배치 로그 관리 페이지 - 배치 로그 조회
     *
     * @param BatchJobExecution
     * @return
     * @throws Exception
     */
    int getBatchLogListCount(BatchJobExecutionEx batchJobExecutionEx) throws Exception;

    /**
     * 배치 로그 관리 페이지 - 배치 로그 조회
     *
     * @param BatchJobExecution
     * @return
     * @throws Exception
     */
    List<BatchJobExecutionEx> getBatchLogList(BatchJobExecutionEx batchJobExecutionEx) throws Exception;

    /**
     * 배치 로그 관리 페이지 - 배치 스텝 로그 조회
     *
     * @param BatchStepExecution
     * @return
     * @throws Exception
     */
    List<BatchStepExecution> getBatchStepList(BatchStepExecution batchStepExecution) throws Exception;

    /**
     * 배치 로그 관리 페이지 - 배치 파라미터 팝업 조회
     *
     * @param BatchJobExecutionParams
     * @return
     * @throws Exception
     */
    List<BatchJobExecutionParams> getBatchParamList(BatchJobExecutionParams batchJobExecutionParams) throws Exception;

    /**
     * 배치/연동 로그관리 페이지 - 연동로그 Grid count 조회
     *
     * @param stLinkLogEx
     * @return
     * @throws Exception
     */
    int getInterLockingLogListCount(StLinkLogEx stLinkLogEx) throws Exception;

    /**
     * 배치/연동 로그관리 페이지 - 연동로그 Grid 조회<br>
     *
     * @param stLinkLogEx
     * @return
     * @throws Exception
     */
    List<StLinkLogEx> getInterLockingLogList(StLinkLogEx stLinkLogEx) throws Exception;

    /**
     * 관리자 로그관리 페이지 - 관리자로그 Grid count 조회
     *
     * @param stUsrWkLogEx
     * @return
     * @throws Exception
     */
    int getAdminLogListCount(StUsrWkLogEx stUsrWkLogEx) throws Exception;

    /**
     * 관리자 로그관리 페이지 - 관리자로그 Grid 조회<br>
     *
     * @param stUsrWkLogEx
     * @return
     * @throws Exception
     */
    List<StUsrWkLogEx> getAdminLogList(StUsrWkLogEx stUsrWkLogEx) throws Exception;

    /**
     * 작업 로그 저장
     * @param stUsrWkLog
     * @throws Exception
     */
    void insertStUsrWkLog(StUsrWkLog stUsrWkLog) throws Exception;

    /**
     * 접속한  Url의 RtTgtSeq조회 및 개인정보 유무 조회
     */
    StRtTgtBase getRtTgtSeqByStRtTgtBase(StRtTgtBase stRtTgtBase) throws Exception;

    /**
     * 배치관리 - 배치 Grid count 조회
     *
     * @param StStdCdEx
     * @return
     * @throws Exception
     */
    int getBatchListCount(BatchJob batchJob) throws Exception;

    /**
     * 배치관리 - 배치 Grid 조회
     *
     * @param StStdCdEx
     * @return
     * @throws Exception
     */
    List<BatchJob> getBatchList(BatchJob batchJob) throws Exception;

    /**
     * batch management - save
     *
     * @param BatchJob
     * @return
     * @throws Exception
     */
    void registCUD(List<BatchJob> createList, List<BatchJob> updateList, List<BatchJob> deleteList) throws Exception;

    void deleteBatchList(List<BatchJob> deleteList) throws Exception;

    void updateBatchList(List<BatchJob> updateList) throws Exception;

    void insertBatchList(List<BatchJob> createList) throws Exception;

    void insertStRtTgtBaseLog(StRtTgtBaseLog stRtTgtBaseLog) throws Exception;
}