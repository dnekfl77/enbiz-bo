package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.BatchStepExecution;

@Repository
@Lazy
public interface BatchStepExecutionMapper {

    List<BatchStepExecution> getBatchStepList(BatchStepExecution batchStepExecution);

}