package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.BatchJobExecutionParams;

@Repository
@Lazy
public interface BatchJobExecutionParamsMapper {

    List<BatchJobExecutionParams> getBatchParamList(BatchJobExecutionParams batchJobExecutionParams);

}