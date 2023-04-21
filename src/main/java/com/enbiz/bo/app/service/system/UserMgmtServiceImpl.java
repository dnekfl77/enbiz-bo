package com.enbiz.bo.app.service.system;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.system.IndividualInfoRightCudRequest;
import com.enbiz.bo.app.dto.request.system.UserCudRequest;
import com.enbiz.bo.app.dto.request.system.UserDetailRequest;
import com.enbiz.bo.app.dto.request.system.UserListRequest;
import com.enbiz.bo.app.dto.request.system.UserRightGroupRequest;
import com.enbiz.bo.app.dto.response.login.PrivacyPolicyInfo;
import com.enbiz.bo.app.dto.response.system.UserDetailResponse;
import com.enbiz.bo.app.dto.response.system.UserListResponse;
import com.enbiz.bo.app.dto.response.system.UserMenuRtInfoResponse;
import com.enbiz.bo.app.dto.response.system.UserRightGroupResponse;
import com.enbiz.bo.app.entity.StIndInfoQryRtInfo;
import com.enbiz.bo.app.entity.StRtInfo;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.bo.app.repository.system.StIndInfoQryRtInfoMapper;
import com.enbiz.bo.app.repository.system.StIndInfoQryRtInfoTrxMapper;
import com.enbiz.bo.app.repository.system.StRtInfoMapper;
import com.enbiz.bo.app.repository.system.StRtInfoTrxMapper;
import com.enbiz.bo.app.repository.system.StUserBaseMapper;
import com.enbiz.bo.app.repository.system.StUserBaseTrxMapper;
import com.enbiz.bo.app.repository.system.StUserRtGrpMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.constant.BaseConstants;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserMgmtServiceImpl implements UserMgmtService{

    private final StUserChgLogService stUserChgLogService;
    private final StUserBaseMapper userMapper;
    private final StUserBaseTrxMapper userTrxMapper;
    private final StIndInfoQryRtInfoMapper stIndInfoRtInfoMapper;
    private final StIndInfoQryRtInfoTrxMapper stIndInfoQryRtInfoTrxMapper;
    private final StRtInfoMapper stRtInfoMapper;
    private final StRtInfoTrxMapper stRtInfoTrxMapper;
    private final StUserRtGrpMapper stUserRtGrpMapper;
    
    @Autowired
	private PasswordEncoder passwordEncoder;

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 수 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    @Override
    public int getUserListInUserMenuCount(UserListRequest userListRequest) {
        return userMapper.getUserListInUserMenuCount(userListRequest);
    }

    /**
     * 사용자메뉴 검색 조건에 부합하는 사용자 목록 조회
     * @param userListRequest
     * @return 사용자 목록
     */
    @Override
    public List<UserListResponse> getUserListInUserMenu(UserListRequest userListRequest) {
        return userMapper.getUserListInUserMenu(userListRequest);
    }

    @Override
    public UserDetailResponse getUserDetail(String userId) {
        StUserBase userInfo = userMapper.getUserDetail(userId);
        List<PrivacyPolicyInfo> rtInfoList = stIndInfoRtInfoMapper.getStIndInfoQryRtInfoList(userId);
        UserDetailResponse response = new UserDetailResponse();
        response.setUserInfo(userInfo);
        response.setIndividualInfoRightList(rtInfoList);
        return response;
    }

    @Override
    public int getUserCount(String userId) {
        return userMapper.getUserCount(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDetailResponse unlockPassword(String userId) throws Exception {
        StUserBase param = new StUserBase();
        param.setUserId(userId);
        param.setPwdLockYn(BaseConstants.N);
        param.setPwdCntnFailCnt(0L);
        userTrxMapper.updatePwdUnlock(param);
        return getUserDetail(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDetailResponse initializePassword(String userId) throws Exception {
        String currentPasswd = getUserDetail(userId).getUserInfo().getPwd();
        String randomPasswd = createRandomPasswd();
        String encryptedPasswd = this.passwordEncoder.encode(randomPasswd);
        StUserBase param = makeInitPasswdParam(userId, encryptedPasswd);
        userTrxMapper.updateInitPassword(param);
        stUserChgLogService.savePasswdChgLog(userId, currentPasswd);
        //패스워드 초기화후 변경된 비밀번호를 아무도 알수없어서 일단 return 에서 관리자에게 알려줌.
        UserDetailResponse user = this.getUserDetail(userId);
        user.getUserInfo().setRandomPasswd(randomPasswd);
        return getUserDetail(userId);
    }

    private StUserBase makeInitPasswdParam(String userId, String encryptedPasswd) {
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sessionId = currentUser.getLoginId();
        StUserBase userBase = new StUserBase();
        userBase.setUserId(userId);
        userBase.setPwd(encryptedPasswd);
        userBase.setPwdIniYn(BaseConstants.Y);
        userBase.setSysModId(sessionId);
        userBase.setPwdLockYn(BaseConstants.N);
        userBase.setPwdCntnFailCnt(0L);
        return userBase;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveUserMenuRt(List<StRtInfo> createList, List<StRtInfo> updateList, List<StRtInfo> deleteList) {
        createList.forEach(stRtInfoTrxMapper::saveStRtInfo);
        updateList.forEach(stRtInfoTrxMapper::saveStRtInfo);
        deleteList.forEach(stRtInfoTrxMapper::deleteStRtInfo);
    }

    @Override
    public List<UserMenuRtInfoResponse> getUserMenuRtInfoList(String userId) {
        return stRtInfoMapper.getUserMenuRtInfoList(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public UserDetailResponse saveUser(UserDetailRequest request) throws Exception{
    	CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sessionId = currentUser.getLoginId();
        UserCudRequest userInfoReq = request.getUserInfo();

        Validator.throwIfEmpty(userInfoReq.getUserId(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"userId"}));
        Validator.throwIfEmpty(userInfoReq.getUserNm(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"userNm"}));
        Validator.throwIfEmpty(userInfoReq.getCellTxnoNo(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"cellTxnoNo"}));
        Validator.throwIfEmpty(userInfoReq.getCellEndNo(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"cellEndNo"}));
        Validator.throwIfEmpty(userInfoReq.getRtGrpNo(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"rtGrpNo"}));
        Validator.throwIfEmpty(userInfoReq.getEmailAddr(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"emailAddr"}));
        Validator.throwIfEmpty(userInfoReq.getJobGrpCd(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"jobGrpCd"}));
        Validator.throwIfEmpty(userInfoReq.getOcpCd(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"ocpCd"}));
        Validator.throwIfEmpty(userInfoReq.getWorkStatCd(), MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[] {"workStatCd"}));

        if (BaseConstants.Y.equals(request.getCreateYn())) {
            insertUserBase(sessionId, userInfoReq);
            saveStIndInfoQryRtInfo(sessionId, request.getIndividualInfoRightList());
            stUserChgLogService.saveCreateUserLog(userInfoReq.getUserId());
        } else {
            updateUserBase(sessionId, userInfoReq);
            saveStIndInfoQryRtInfo(sessionId, request.getIndividualInfoRightList());
            if (BaseConstants.Y.equals(request.getChangeRtGrpNoYn())) {
                stUserChgLogService.saveRtGrpChangeLog(userInfoReq.getUserId(), request.getBeforeRtGrpNo());
            }
        }

        return getUserDetail(userInfoReq.getUserId());
    }

    private void insertUserBase(String currentUser, UserCudRequest userInfoReq) throws Exception {
        StUserBase userParam = new StUserBase();
        BeanUtils.copyProperties(userParam, userInfoReq);
        userParam.setPwd(this.passwordEncoder.encode(userInfoReq.getPwd()));
        userParam.setUseStrtDt(DateTimeFormatter.BASIC_ISO_DATE.format(LocalDate.now()));
        userParam.setUseEndDt(DateTimeFormatter.BASIC_ISO_DATE.format(LocalDate.of(2999, 12, 31)));
        userParam.setPwdCntnFailCnt(0L);
        userParam.setPwdLockYn(BaseConstants.N);
        userParam.setPwdIniYn(BaseConstants.N);
        userParam.setSysRegId(currentUser);
        userParam.setSysModId(currentUser);
        userTrxMapper.insertUserBase(userParam);
    }

    private void saveStIndInfoQryRtInfo(String currentUser, List<IndividualInfoRightCudRequest> indInfoCudReqList) throws Exception {
    	for (IndividualInfoRightCudRequest request : indInfoCudReqList) {
            StIndInfoQryRtInfo indInfoCudParam = new StIndInfoQryRtInfo();
            BeanUtils.copyProperties(indInfoCudParam, request);
            indInfoCudParam.setSysRegId(currentUser);
            indInfoCudParam.setSysModId(currentUser);
            stIndInfoQryRtInfoTrxMapper.saveStIndInfoQryRtInfo(indInfoCudParam);
        }
    }

    private void updateUserBase(String currentUser, UserCudRequest userInfoReq) throws Exception {

        StUserBase userParam = new StUserBase();
        BeanUtils.copyProperties(userParam, userInfoReq);
        userParam.setSysModId(currentUser);

        log.debug("[userParam]{}", userParam);
        userTrxMapper.updateUserBase(userParam);
    }

    @Override
    public List<UserRightGroupResponse> getUserRightGroupInfo(UserRightGroupRequest UserRightGroupRequest) {
        return stUserRtGrpMapper.getUserRtGrpInfo(UserRightGroupRequest);
    }

    @Override
    public int getUserRightGroupListCount(UserRightGroupRequest request) {
        return stUserRtGrpMapper.getUserRtGrpBtnGridListCount(request);
    }

    public String createRandomPasswd() {
        ThreadLocalRandom rnd =ThreadLocalRandom.current();
        StringBuffer rdStr =new StringBuffer();
        String[] chars = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
        for (int i=0;i<5;i++){
            rdStr.append(chars[rnd.nextInt(chars.length)]);
        }
        rdStr.append(rnd.nextInt(10));
        rdStr.append(rnd.nextInt(10));
        rdStr.append(rnd.nextInt(10));
        String[] spChars = "!,@,#,$".split(",");
        for (int i=0;i<2;i++){
            rdStr.append(spChars[rnd.nextInt(spChars.length)]);
        }
        return rdStr.toString();
    }

}
