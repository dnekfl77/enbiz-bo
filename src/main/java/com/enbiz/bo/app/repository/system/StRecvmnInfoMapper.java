package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.ReceiveManagerRequest;
import com.enbiz.bo.app.dto.response.system.ReceiveManagerResponse;
import com.enbiz.bo.app.entity.StRecvmnInfo;

@Repository
@Lazy
public interface StRecvmnInfoMapper {
	List<ReceiveManagerResponse> getRecvmnList(ReceiveManagerRequest receiveManagerRequest);
	
	int getRecvmnListCount(ReceiveManagerRequest receiveManagerRequest);
	
	List<ReceiveManagerResponse> getRecvmnListNoPage(ReceiveManagerRequest receiveManagerRequest);
	
	int getUserForRecvnmToInsertCheck(StRecvmnInfo stRecvmnInfo);

	int getRecvmnCntMappedToRecvGrp(String recvGrpNo);
}
