package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.CcCmAgmtPolcInfoRequest;
import com.enbiz.bo.app.dto.response.display.CcCmAgmtPolcInfoResponse;
import com.enbiz.bo.app.entity.CcCmAgmtPolcInfo;
import com.enbiz.bo.app.repository.display.CcCmAgmtPolcInfoMapper;
import com.enbiz.bo.app.repository.display.CcCmAgmtPolcInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 약관&이용안내 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class TermsConditionsMgmtServiceImpl implements TermsConditionsMgmtService {

    private final CcCmAgmtPolcInfoMapper ccCmAgmtPolcInfoMapper;
    private final CcCmAgmtPolcInfoTrxMapper ccCmAgmtPolcInfoTrxMapper;

    @Override
    public List<CcCmAgmtPolcInfoResponse> getTermsConditionsList(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception {
        return ccCmAgmtPolcInfoMapper.getTermsConditionsList(ccCmAgmtPolcInfoRequest);
    }

    @Override
    public int getTermsConditionsListCount(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception {
        return ccCmAgmtPolcInfoMapper.getTermsConditionsListCount(ccCmAgmtPolcInfoRequest);
    }

    @Override
    public CcCmAgmtPolcInfoResponse getAgmtUtilGuideByCmAgmtSeq(CcCmAgmtPolcInfoRequest ccCmAgmtPolcInfoRequest) throws Exception {
        Validator.throwIfEmpty(ccCmAgmtPolcInfoRequest.getCmAgmtSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"공통약관순번"}));
        return ccCmAgmtPolcInfoMapper.getAgmtUtilGuideByCmAgmtSeq(ccCmAgmtPolcInfoRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertCcCmAgmtPolcInfo(CcCmAgmtPolcInfo ccCmAgmtPolcInfo) throws Exception {
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getAgmtPolcCd()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"약관정책코드"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getAplyStrDt()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"적용시작일자"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getAplyEndDt()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"적용종료일자"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getCmAgmtPolcGbCd()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"공통약관정책구분코드"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getTitle()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"제목"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getWrdCont()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"문구내용"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getSysRegId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        Validator.throwIfLongerThan(ccCmAgmtPolcInfo.getTitle()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"제목","200"}));
        ccCmAgmtPolcInfoTrxMapper.insertCcCmAgmtPolcInfo(ccCmAgmtPolcInfo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateCcCmAgmtPolcInfo(CcCmAgmtPolcInfo ccCmAgmtPolcInfo) throws Exception {
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getCmAgmtSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"공통약관순번"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getAgmtPolcCd()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"약관정책코드"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getAplyStrDt()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"적용시작일자"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getAplyEndDt()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"적용종료일자"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getCmAgmtPolcGbCd()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"공통약관정책구분코드"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getTitle()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"제목"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getWrdCont()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"문구내용"}));
        Validator.throwIfEmpty(ccCmAgmtPolcInfo.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        Validator.throwIfLongerThan(ccCmAgmtPolcInfo.getTitle()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"제목","200"}));
        ccCmAgmtPolcInfoTrxMapper.updateCcCmAgmtPolcInfo(ccCmAgmtPolcInfo);
    }

}
