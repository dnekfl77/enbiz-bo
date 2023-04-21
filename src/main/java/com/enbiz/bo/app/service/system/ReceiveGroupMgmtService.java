package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.ReceiveGroupRequest;
import com.enbiz.bo.app.dto.request.system.ReceiveManagerRequest;
import com.enbiz.bo.app.dto.response.system.ReceiveGroupResponse;
import com.enbiz.bo.app.dto.response.system.ReceiveManagerResponse;
import com.enbiz.bo.app.entity.StRecvGrpInfo;
import com.enbiz.bo.app.entity.StRecvmnInfo;

/**
 * 수신그룹관리 서비스
 *
 */
public interface ReceiveGroupMgmtService {
	/**
	 * 수신그룹 목록 조회
	 * @param receiveGroupRequest
	 * @return
	 */
	public List<ReceiveGroupResponse> getReceiveGroupList(ReceiveGroupRequest receiveGroupRequest);
	
	/**
	 * 수신그룹 목록 전체수
	 * @param receiveGroupRequest
	 * @return
	 */
	public int getReceiveGroupListCount(ReceiveGroupRequest receiveGroupRequest);

	/**
	 * 수신그룹 저장
	 * @param createList
	 * @param updateList
	 * @param deleteList
	 * @throws Exception
	 */
	public void saveReceiveGroup(List<StRecvGrpInfo> createList, List<StRecvGrpInfo> updateList,
			List<StRecvGrpInfo> deleteList) throws Exception;

	/**
	 * 수신자 목록 조회
	 * @param receiveManagerRequest
	 * @return
	 */
	public List<ReceiveManagerResponse> getReceiveManagerList(ReceiveManagerRequest receiveManagerRequest);
	
	/**
	 * 수신자 목록 전체수
	 * @param receiveManagerRequest
	 * @return
	 */
	public int getReceiveManagerListCount(ReceiveManagerRequest receiveManagerRequest);

	/**
	 * 수신자 목록 조회(페이징X)
	 * @param receiveManagerRequest
	 * @return
	 */
	public List<ReceiveManagerResponse> getReceiveManagerListNoPage(ReceiveManagerRequest receiveManagerRequest);
	
	/**
	 * 수신자 저장
	 * @param createList
	 * @param deleteList
	 * @throws Exception
	 */
	public void saveReceiveManager(List<StRecvmnInfo> createList, List<StRecvmnInfo> deleteList) throws Exception;

}
