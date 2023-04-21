package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.ReceiveGroupRequest;
import com.enbiz.bo.app.dto.response.system.ReceiveGroupResponse;
import com.enbiz.bo.app.entity.StRecvGrpInfo;

@Repository
@Lazy
public interface StRecvGrpInfoMapper {
	List<ReceiveGroupResponse> getRecvGrpList(ReceiveGroupRequest receiveGroupRequest);
	
	int getRecvGrpListCount(ReceiveGroupRequest receiveGroupRequest);

	int getRecvGrpNmToInsertCheck(StRecvGrpInfo stRecvGrpInfo);
}
