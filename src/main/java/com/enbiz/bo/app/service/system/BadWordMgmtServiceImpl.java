package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.BadWordMgmtRequest;
import com.enbiz.bo.app.dto.response.system.BadWordMgmtResponse;
import com.enbiz.bo.app.entity.StBwInfo;
import com.enbiz.bo.app.repository.system.StBwInfoMapper;
import com.enbiz.bo.app.repository.system.StBwInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 금칙어 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class BadWordMgmtServiceImpl implements BadWordMgmtService {

    private final StBwInfoMapper stBwInfoMapper;
    private final StBwInfoTrxMapper stBwInfoTrxMapper;

    @Override
    public List<BadWordMgmtResponse> getBadWordList(BadWordMgmtRequest BadWordMgmtRequest) throws Exception {
        return stBwInfoMapper.getBadWordList(BadWordMgmtRequest);
    }

    @Override
    public int getBadWordListCount(BadWordMgmtRequest BadWordMgmtRequest) {
        return stBwInfoMapper.getBadWordListCount(BadWordMgmtRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registBadWord(List<StBwInfo> createList) throws Exception {
        for (StBwInfo stBwInfo : createList) {
            validateBadWordInsertData(stBwInfo);
            if (this.getCountOfExistsStBwInfoByBwNm(stBwInfo) > 0 ) {
                throw new ValidationException(MessageResolver.getMessage("badWordMgmt.badword.name.duplicated"));
            }
            stBwInfoTrxMapper.insertBadWord(stBwInfo);
        }
    }

    private void validateBadWordInsertData(StBwInfo stBwInfo) throws Exception{
        Validator.throwIfEmpty(stBwInfo.getBwNm()       ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("badWordMgmt.label.badword.name")}));
        Validator.throwIfEmpty(stBwInfo.getUseYn()      ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
        Validator.throwIfEmpty(stBwInfo.getSysRegId()   ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyBadWord(List<StBwInfo> updateList) throws Exception {
        for (StBwInfo stBwInfo : updateList) {
            validateBadWordUpdateData(stBwInfo);
            if (this.getCountOfExistsStBwInfoByBwNm(stBwInfo) > 0 ) {
                throw new ValidationException(MessageResolver.getMessage("badWordMgmt.badword.name.duplicated"));
            }
            stBwInfoTrxMapper.updateBadWord(stBwInfo);
        }
    }

    private void validateBadWordUpdateData(StBwInfo stBwInfo) throws Exception{
        Validator.throwIfEmpty(stBwInfo.getBwSeq()      ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("badWordMgmt.label.badword.seq")}));
        Validator.throwIfEmpty(stBwInfo.getBwNm()       ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("badWordMgmt.label.badword.name")}));
        Validator.throwIfEmpty(stBwInfo.getUseYn()      ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
        Validator.throwIfEmpty(stBwInfo.getSysModId()   ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteBadWord(List<StBwInfo> deleteList) throws Exception {
        for (StBwInfo stBwInfo : deleteList) {
            Validator.throwIfEmpty(stBwInfo.getBwSeq() ,MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("badWordMgmt.label.badword.seq")}));
            stBwInfoTrxMapper.deleteBadWord(stBwInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveBadWord(List<StBwInfo> createList, List<StBwInfo> updateList, List<StBwInfo> deleteList) throws Exception {
    	registBadWord(createList);
        modifyBadWord(updateList);
        deleteBadWord(deleteList);
    }

    public int getCountOfExistsStBwInfoByBwNm(StBwInfo stBwInfo) throws Exception {
        return stBwInfoMapper.getCountOfExistsStBwInfoByBwNm(stBwInfo);
    }
}
