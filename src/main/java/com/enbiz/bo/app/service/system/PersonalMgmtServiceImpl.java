package com.enbiz.bo.app.service.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.bo.app.entity.StUserChgLog;
import com.enbiz.bo.app.repository.system.StUserBaseMapper;
import com.enbiz.bo.app.repository.system.StUserBaseTrxMapper;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import com.enbiz.common.base.constant.BaseConstants;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class PersonalMgmtServiceImpl implements PersonalMgmtService {

    @Autowired
    private StUserBaseMapper stUserBaseMapper;
    @Autowired
    private StUserBaseTrxMapper stUserBaseTrxMapper;
    @Autowired
    private StUserChgLogService stUserChgLogService;

//    @Autowired
//    private StBmMenuInfoMapper stBmMenuInfoMapper;
//    @Autowired
//    private StBmMenuInfoTrxMapper stBmMenuInfoTrxMapper;
//    @Autowired
//    private EtUsrBaseMapper etUsrBaseMapper;
//    @Autowired
//    private EtUsrBaseTrxMapper etUsrBaseTrxMapper;

    /**
     * 즐겨찾기 count 조회
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    @Override
//    public int getBookmarkListCount(StBmMenuInfo stBmMenuInfo) throws Exception {
//        return stBmMenuInfoMapper.getBookmarkListCount(stBmMenuInfo);
//    }

    /**
     * 즐겨찾기 리스트 조회
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    @Override
//    public List<StBmMenuInfoEx> getBookmarkList(StBmMenuInfo stBmMenuInfo) throws Exception {
//        return stBmMenuInfoMapper.getBookmarkList(stBmMenuInfo);
//    }

    /**
     * 즐겨찾기 리스트 저장 CUD
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    @Override
//    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
//    public void saveBookmarkList(List<StBmMenuInfo> createList, List<StBmMenuInfo> updateList,
//            List<StBmMenuInfo> deleteList) throws Exception {
//        deleteBookmarkList(deleteList);
//        updateBookmarkList(updateList);
//    }

    /**
     * 즐겨찾기 리스트 저장 CUD - 삭제 delete
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    @Override
//    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
//    public void deleteBookmarkList(List<StBmMenuInfo> deleteList) throws Exception {
//        for (StBmMenuInfo stBmMenuInfo : deleteList) {
//            stBmMenuInfo.setUsrId(stBmMenuInfo.getSysRegrId());
//            stBmMenuInfoTrxMapper.deleteBookmarkList(stBmMenuInfo);
//        }
//
//    }

    /**
     * 즐겨찾기 리스트 저장 CUD - 수정 update
     *
     * @param stBmMenuInfo
     * @return
     * @throws Exception
     */
//    @Override
//    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
//    public void updateBookmarkList(List<StBmMenuInfo> updateList) throws Exception {
//        for (StBmMenuInfo stBmMenuInfo : updateList) {
//            stBmMenuInfo.setUsrId(stBmMenuInfo.getSysRegrId());
//            stBmMenuInfoTrxMapper.updateBookmarkList(stBmMenuInfo);
//        }
//    }

    /**
     * 패스워드변경 페이지 저장
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveChangePassword(LoginRequest loginRequest) throws Exception {
        boolean passWordCheckBool = false;
        int cnt = 1;
        int cntDay = 0;
        int cntPwdChg = 0;
        
        if(passWordCheckBool){
            cnt = stUserBaseMapper.getChagePasswordConfirm(loginRequest); // 입력한 원패스워드가 일치한지 확인
        }
        
        if(cnt == 1) {
            
            /* 비밀번호초기화 제외 */
            if(loginRequest.getPwdIniYn() == null || loginRequest.getPwdIniYn().isEmpty()
                    || BaseConstants.N.equals(loginRequest.getPwdIniYn())) {
                /**
                 * 비밀번호 1일 1회수정 가능 처리 - 원패스워드 비교와 분리 : 메시지 분기목적
                 * */
                cntDay = stUserBaseMapper.getChagePasswordDayCheck(loginRequest);
                
                if( cntDay >= 1) {
                    throw new ValidationException(
                            MessageResolver.getMessage("system.monitoringMgmt.ChangePassword.msg.dayCheck")
                    );
                }
                
                /**
                 * 비밀번호 변경 이력 3회까지 관리 재사용 제한
                 */
                StUserChgLog stUserChgLog = new StUserChgLog();
                stUserChgLog.setUserId(loginRequest.getSysRegId());
                stUserChgLog.setChgCont(loginRequest.getPwd());
                cntPwdChg = stUserChgLogService.getStUserChgLogPwdChgCnt(loginRequest) ;
                if(cntPwdChg >= 1 ) {
                    throw new ValidationException(MessageResolver.getMessage("system.monitoringMgmt.ChangePassword.msg.changeCnt"));
                }
                
            }
            StUserBase stUserBase = new StUserBase();
            stUserBase.setUserId(loginRequest.getUserId());
            stUserBase.setSysRegId(loginRequest.getSysRegId());
            stUserBase.setPwd(loginRequest.getPwd());
            stUserBase.setPwdIniYn(loginRequest.getPwdIniYn());

            stUserBaseTrxMapper.updateChagePassword(stUserBase);
            
        } else {
            throw new ValidationException(MessageResolver.getMessage("system.monitoringMgmt.ChangePassword.msg.originalPassword.NotMatched"));
        }
    }

}
