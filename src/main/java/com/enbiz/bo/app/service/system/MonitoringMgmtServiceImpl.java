package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
import com.enbiz.bo.app.repository.system.BatchJobExecutionMapper;
import com.enbiz.bo.app.repository.system.BatchJobExecutionParamsMapper;
import com.enbiz.bo.app.repository.system.BatchJobMapper;
import com.enbiz.bo.app.repository.system.BatchJobTrxMapper;
import com.enbiz.bo.app.repository.system.BatchStepExecutionMapper;
import com.enbiz.bo.app.repository.system.StBatchLogMapper;
import com.enbiz.bo.app.repository.system.StRtTgtBaseLogTrxMapper;
import com.enbiz.bo.app.repository.system.StUsrWkLogMapper;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MonitoringMgmtServiceImpl implements MonitoringMgmtService {
	private final RestApiUtil restApiUtil;
    private final StBatchLogMapper stBatchLogMapper;
    private final StUsrWkLogMapper stUsrWkLogMapper;
    private final BatchJobMapper batchJobMapper;
    private final BatchJobTrxMapper batchJobTrxMapper;
    private final BatchJobExecutionMapper batchJobExecutionMapper;
    private final BatchStepExecutionMapper batchStepExecutionMapper;
    private final BatchJobExecutionParamsMapper batchJobExecutionParamsMapper;
    private final StRtTgtBaseLogTrxMapper stRtTgtBaseLogTrxMapper;
    
    @Value("${app.apiUrl.bo}")
	private String boApiUrl;

    /**
     * 배치/연동 로그관리 페이지 - 배치로그 Grid count 조회
     */
    @Override
    public int getBatchLogListCount(StBatchLogEx stBatchLogEx) throws Exception {
        return stBatchLogMapper.getBatchLogListCount(stBatchLogEx);
    }
    /**
     * 배치/연동 로그관리 페이지 - 배치로그 Grid 조회<br>
     */
    @Override
    public List<StBatchLogEx> getBatchLogList(StBatchLogEx stBatchLogEx) throws Exception {
        return stBatchLogMapper.getBatchLogList(stBatchLogEx);
    }

    /**
     * 배치 로그 관리 페이지 - 배치 로그 조회 <br>
     */
    @Override
    public int getBatchLogListCount(BatchJobExecutionEx batchJobExecutionEx) throws Exception {
        return batchJobExecutionMapper.getBatchLogListCount(batchJobExecutionEx);
    }

    /**
     * 배치 로그 관리 페이지 - 배치 로그 조회 <br>
     */
    @Override
    public List<BatchJobExecutionEx> getBatchLogList(BatchJobExecutionEx batchJobExecutionEx) throws Exception {
        return batchJobExecutionMapper.getBatchLogList(batchJobExecutionEx);
    }

    /**
     * 배치 로그 관리 페이지 - 배치 스텝 로그 조회 <br>
     */
    @Override
    public List<BatchStepExecution> getBatchStepList(BatchStepExecution batchStepExecution) throws Exception {
        return batchStepExecutionMapper.getBatchStepList(batchStepExecution);
    }

    /**
     * batch logging management - batch param popup grid search
     */
    @Override
    public List<BatchJobExecutionParams> getBatchParamList(BatchJobExecutionParams batchJobExecutionParams)
            throws Exception {
        return batchJobExecutionParamsMapper.getBatchParamList(batchJobExecutionParams);
    }

    /**
     * 배치/연동 로그관리 페이지 - 연동로그 Grid count 조회
     */
    @Override
    public int getInterLockingLogListCount(StLinkLogEx stLinkLogEx) throws Exception {
        return stBatchLogMapper.getInterLockingLogListCount(stLinkLogEx);
    }

    /**
     * 배치/연동 로그관리 페이지 - 연동로그 Grid 조회<br>
     */
    @Override
    public List<StLinkLogEx> getInterLockingLogList(StLinkLogEx stLinkLogEx) throws Exception {
        return stBatchLogMapper.getInterLockingLogList(stLinkLogEx);
    }

    /**
     * 관리자 로그관리 페이지 - 관리자로그 Grid count 조회
     */
    @Override
    public int getAdminLogListCount(StUsrWkLogEx stUsrWkLogEx) throws Exception {
        return stUsrWkLogMapper.getAdminLogListCount(stUsrWkLogEx);
    }

    /**
     * 관리자 로그관리 페이지 - 관리자로그 Grid 조회<br>
     */
    @Override
    public List<StUsrWkLogEx> getAdminLogList(StUsrWkLogEx stUsrWkLogEx) throws Exception {
        return stUsrWkLogMapper.getAdminLogList(stUsrWkLogEx);
    }
    
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertStUsrWkLog(StUsrWkLog stUsrWkLog) throws Exception{
        // TODO 맞추어서 개발 필요
        // stUsrWkLogTrxMapper.insertStUsrWkLog(stUsrWkLog);
    }

    @Override
    public StRtTgtBase getRtTgtSeqByStRtTgtBase(StRtTgtBase stRtTgtBase) throws Exception{
    	return restApiUtil.get(boApiUrl+ "/api/bo/common/common/getRtTgtSeqByStRtTgtBase", stRtTgtBase, new ParameterizedTypeReference<Response<StRtTgtBase>>() {}).getPayload();
    }

    /**
     * 배치관리 - 배치 Grid count 조회
     */
    @Override
    public int getBatchListCount(BatchJob batchJob) throws Exception {
        return batchJobMapper.getBatchListCount(batchJob);
    }

    /**
     * 배치관리 - 배치 Grid 조회
     */
    @Override
    public List<BatchJob> getBatchList(BatchJob batchJob) throws Exception {
        return batchJobMapper.getBatchList(batchJob);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertBatchList(List<BatchJob> createList) throws Exception {
        for (BatchJob batchJob : createList) {
            batchJobTrxMapper.insertBatchList(batchJob);
        }

    }

    @Override
    //@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertStRtTgtBaseLog(StRtTgtBaseLog stRtTgtBaseLog) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/common/common/insertStRtTgtBaseLog", stRtTgtBaseLog, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateBatchList(List<BatchJob> updateList) throws Exception {
        for (BatchJob batchJob : updateList) {
            batchJobTrxMapper.updateBatchList(batchJob);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteBatchList(List<BatchJob> deleteList) throws Exception {
        for (BatchJob batchJob : deleteList) {
            batchJobTrxMapper.deleteBatchList(batchJob);
        }
    }

    /**
     * batch management - save
     */
    @Override
    public void registCUD(List<BatchJob> createList, List<BatchJob> updateList, List<BatchJob> deleteList)
            throws Exception {
        insertBatchList(createList);
        updateBatchList(updateList);
        deleteBatchList(deleteList);
    }
}
