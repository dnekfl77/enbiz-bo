package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.BatchJob;

@Repository
@Lazy
public interface BatchJobMapper {
	BatchJob getBatchJob(String jobName);

    int getBatchListCount(BatchJob batchJob);

    List<BatchJob> getBatchList(BatchJob batchJob);
}
