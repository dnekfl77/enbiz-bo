package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.BatchJob;

@Repository
@Lazy
public interface BatchJobTrxMapper {
	void setBatchRunning(BatchJob batchJob);

    void insertBatchList(BatchJob batchJob);

    void updateBatchList(BatchJob batchJob);

    void deleteBatchList(BatchJob batchJob);
}
