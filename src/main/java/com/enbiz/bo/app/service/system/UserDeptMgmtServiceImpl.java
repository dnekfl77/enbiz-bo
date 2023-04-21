package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.UserDeptRequest;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.bo.app.repository.system.StDeptCdMapper;
import com.enbiz.bo.app.repository.system.StDeptCdTrxMapper;
import com.enbiz.bo.app.repository.system.StUserBaseMapper;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserDeptMgmtServiceImpl implements UserDeptMgmtService{

    private final StDeptCdMapper stDeptCdMapper;
    private final StDeptCdTrxMapper stDeptCdTrxMapper;
    private final StUserBaseMapper stUserBaseMapper;

    /**
     * 부서 계층구조 목록 조회
     */
    @Override
    public List<UserDeptResponse> getUserDeptListWithHierarchy() throws Exception {
        return stDeptCdMapper.getStDeptCdListWithHierarchy();
    }

    /**
     * 부서 목록 수 조회
     */
    @Override
    public int getUserDeptListCount(UserDeptRequest request) throws Exception {
    	log.debug("[request]{}", request);
        return stDeptCdMapper.getStDeptCdListCount(request);
    }

    /**
     * 부서 목록 조회
     */
    @Override
    public List<UserDeptResponse> getUserDeptList(UserDeptRequest request) throws Exception {
        return stDeptCdMapper.getStDeptCdList(request);
    }

    /**
     * 부서 목록 저장
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveUserDeptList(List<UserDeptRequest> createList, List<UserDeptRequest> updateList, List<UserDeptRequest> deleteList) throws Exception {
    	if(createList!=null && createList.size()>0) {
    		stDeptCdTrxMapper.insertStDeptCdList(createList);
    	}
    	if(updateList!=null && updateList.size()>0) {
    		stDeptCdTrxMapper.updateStDeptCdList(updateList);
    	}
    	if(deleteList!=null && deleteList.size()>0) {
    		//삭제하려는 부서가 이미 사용자에게 세팅되어 있을 경우 삭제 불가
    		for (UserDeptRequest deleteInfo : deleteList) {
    			StUserBase userInfoMappedToDept = stUserBaseMapper.getUserInfoMappedToDept(deleteInfo.getDeptCd());
    			if (userInfoMappedToDept != null && StringUtils.isNotEmpty(userInfoMappedToDept.getUserId())) {
    				throw new ValidationException(MessageResolver.getMessage("userDeptMgmt.alert.msg.deptCd.userId.existUserInDept", new String[] {userInfoMappedToDept.getDeptCd(),userInfoMappedToDept.getUserId()}));
    			}
    			else {
    				stDeptCdTrxMapper.deleteStDeptCd(deleteInfo);
    			}
    		}
    	}
    }
}
