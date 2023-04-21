package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.ReceiveGroupRequest;
import com.enbiz.bo.app.dto.request.system.ReceiveManagerRequest;
import com.enbiz.bo.app.dto.response.system.ReceiveGroupResponse;
import com.enbiz.bo.app.dto.response.system.ReceiveManagerResponse;
import com.enbiz.bo.app.entity.StRecvGrpInfo;
import com.enbiz.bo.app.entity.StRecvmnInfo;
import com.enbiz.bo.app.repository.system.StRecvGrpInfoMapper;
import com.enbiz.bo.app.repository.system.StRecvGrpInfoTrxMapper;
import com.enbiz.bo.app.repository.system.StRecvmnInfoMapper;
import com.enbiz.bo.app.repository.system.StRecvmnInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ReceiveGroupMgmtServiceImpl implements ReceiveGroupMgmtService {
	
	private final StRecvGrpInfoMapper stRecvGrpInfoMapper;
	private final StRecvGrpInfoTrxMapper stRecvGrpInfoTrxMapper;
	private final StRecvmnInfoMapper stRecvmnInfoMapper;
	private final StRecvmnInfoTrxMapper stRecvmnInfoTrxMapper;
	
	@Override
	public List<ReceiveGroupResponse> getReceiveGroupList(ReceiveGroupRequest receiveGroupRequest) {
		return stRecvGrpInfoMapper.getRecvGrpList(receiveGroupRequest);
	}
	
	@Override
	public int getReceiveGroupListCount(ReceiveGroupRequest receiveGroupRequest) {
		return stRecvGrpInfoMapper.getRecvGrpListCount(receiveGroupRequest);
	}

	@Override
	public void saveReceiveGroup(List<StRecvGrpInfo> createList, List<StRecvGrpInfo> updateList,
			List<StRecvGrpInfo> deleteList) throws Exception {
		registReceiveGroup(createList);
		modifyReceiveGroup(updateList);
		deleteReceiveGroup(deleteList);
	}


	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	private void registReceiveGroup(List<StRecvGrpInfo> createList) throws Exception {
		for (StRecvGrpInfo stRecvGrpInfo : createList) {
			stRecvGrpValidation(stRecvGrpInfo);
			//수신그룹명 중복체크
			int recvGrpNmCount = stRecvGrpInfoMapper.getRecvGrpNmToInsertCheck(stRecvGrpInfo);
			if (recvGrpNmCount >= 1) {
				throw new ValidationException("["+stRecvGrpInfo.getRecvGrpNm()+"] "+MessageResolver.getMessage("receiveGroupMgmt.message.recv.grp.mgmt.recv.grp.nm.duplicate"));
			}
			
			stRecvGrpInfoTrxMapper.insertRecvGrp(stRecvGrpInfo);
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	private void modifyReceiveGroup(List<StRecvGrpInfo> updateList) throws Exception {
		for (StRecvGrpInfo stRecvGrpInfo : updateList) {
			stRecvGrpValidation(stRecvGrpInfo);
			stRecvGrpInfoTrxMapper.updateRecvGrp(stRecvGrpInfo);
		}
	}
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	private void deleteReceiveGroup(List<StRecvGrpInfo> deleteList) throws Exception {
		for (StRecvGrpInfo stRecvGrpInfo : deleteList) {
			//수신그룹에 매핑된 수신자가 있으면 삭제 불가.
			int recvmnCount = stRecvmnInfoMapper.getRecvmnCntMappedToRecvGrp(stRecvGrpInfo.getRecvGrpNo());
			if (recvmnCount >= 1) {
				throw new ValidationException(MessageResolver.getMessage("receiveGroupMgmt.message.recv.grp.mgmt.reference.data.exist"));
			}
			stRecvGrpInfoTrxMapper.deleteRecvGrp(stRecvGrpInfo);
		}
	}

	@Override
	public List<ReceiveManagerResponse> getReceiveManagerList(ReceiveManagerRequest receiveManagerRequest) {
		return stRecvmnInfoMapper.getRecvmnList(receiveManagerRequest);
	}
	
	@Override
	public int getReceiveManagerListCount(ReceiveManagerRequest receiveManagerRequest) {
		return stRecvmnInfoMapper.getRecvmnListCount(receiveManagerRequest);
	}

	@Override
	public List<ReceiveManagerResponse> getReceiveManagerListNoPage(ReceiveManagerRequest receiveManagerRequest) {
		return stRecvmnInfoMapper.getRecvmnListNoPage(receiveManagerRequest);
	}
	
	@Override
	public void saveReceiveManager(List<StRecvmnInfo> createList, List<StRecvmnInfo> deleteList) throws Exception {
		registReceiveManager(createList);
		deleteReceiveManager(deleteList);
	}


	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	private void registReceiveManager(List<StRecvmnInfo> createList) throws Exception {
		for (StRecvmnInfo stRecvmnInfo : createList) {
			stRecvmnValidation(stRecvmnInfo);
			//수신자 아이디 중복체크
			int recvGrpNmCount = stRecvmnInfoMapper.getUserForRecvnmToInsertCheck(stRecvmnInfo);
			if (recvGrpNmCount >= 1) {
				throw new ValidationException(MessageResolver.getMessage("receiveGroupMgmt.message.recv.grp.mgmt.recvmn.user.grp.id.duplicate",new String[] {stRecvmnInfo.getRecvGrpNo(),stRecvmnInfo.getUserId()}));
			}
			
			stRecvmnInfoTrxMapper.insertRecvmn(stRecvmnInfo);
		}
	}
	
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	private void deleteReceiveManager(List<StRecvmnInfo> deleteList) throws Exception {
		for (StRecvmnInfo stRecvmnInfo : deleteList) {
			stRecvmnInfoTrxMapper.deleteRecvmn(stRecvmnInfo);
		}
	}

	/**
	 * 수신그룹 insert/update 전 입력값 validation
	 * @param stRecvGrpInfo
	 * @throws Exception
	 */
	
	private void stRecvGrpValidation(StRecvGrpInfo stRecvGrpInfo) throws Exception {
		Validator.throwIfEmpty(stRecvGrpInfo.getRecvGrpNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"RecvGrpNm"}));
		Validator.throwIfEmpty(stRecvGrpInfo.getPblYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PblYn"}));
		Validator.throwIfEmpty(stRecvGrpInfo.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UseYn"}));
		Validator.throwIfEmpty(stRecvGrpInfo.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"SysRegId"}));
		Validator.throwIfEmpty(stRecvGrpInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"SysModId"}));
	}
	
	/**
	 * 수신자 insert 전 입력값 validation
	 * @param stRecvmnInfo
	 * @throws Exception
	 */
	private void stRecvmnValidation(StRecvmnInfo stRecvmnInfo) throws Exception {
		Validator.throwIfEmpty(stRecvmnInfo.getRecvGrpNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"RecvGrpNo"}));
		Validator.throwIfEmpty(stRecvmnInfo.getUserId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"UserId"}));
		Validator.throwIfEmpty(stRecvmnInfo.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"SysRegId"}));
		Validator.throwIfEmpty(stRecvmnInfo.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"SysModId"}));
	}

}
