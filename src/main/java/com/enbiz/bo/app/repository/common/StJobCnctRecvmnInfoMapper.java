package com.enbiz.bo.app.repository.common;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.popup.JobCnctListRequest;
import com.enbiz.bo.app.dto.request.popup.JobCnctRequest;
import com.enbiz.bo.app.dto.response.popup.JobCnctListResponse;
import com.enbiz.bo.app.dto.response.popup.JobCnctResponse;
import com.enbiz.bo.app.entity.StJobCnctRecvmnInfo;

@Repository
@Lazy
public interface StJobCnctRecvmnInfoMapper {
	
	List<JobCnctListResponse> getJobCnctRecvmnnInfoList(JobCnctListRequest jobCnctListRequest);
	
	int getJobCnctRecvmnnInfoListCount(JobCnctListRequest jobCnctListRequest);

	void insertJobCnctRecvmnInfo(StJobCnctRecvmnInfo stJobCnctRecvmnInfo);
	
	JobCnctResponse getJobCnctRecvmnInfo(JobCnctRequest jobCnctRequest);

	JobCnctResponse getJobCnctAnsInfo(JobCnctRequest jobCnctRequest);

	void updateJobCnctRecvmnInfo(StJobCnctRecvmnInfo stJobCnctRecvmnInfo);
	
}
