package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.system.CustomerNoticeRequest;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeAttachFile;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeResponse;
import com.enbiz.bo.app.entity.PrNtcAtchFileInfo;
import com.enbiz.bo.app.entity.PrNtcInfo;
import com.enbiz.bo.app.repository.system.PrNtcAtchFileInfoMapper;
import com.enbiz.bo.app.repository.system.PrNtcAtchFileInfoTrxMapper;
import com.enbiz.bo.app.repository.system.PrNtcInfoMapper;
import com.enbiz.bo.app.repository.system.PrNtcInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class CustomerNoticeMgmtServiceImpl implements CustomerNoticeMgmtService {

    private final PrNtcInfoMapper prNtcInfoMapper;
    private final PrNtcInfoTrxMapper prNtcInfoTrxMapper;
    private final PrNtcAtchFileInfoMapper prNtcAtchFileInfoMapper;
    private final PrNtcAtchFileInfoTrxMapper prNtcAtchFileInfoTrxMapper;

    @Override
    public int getCustomerNoticeListCount(CustomerNoticeRequest request) throws Exception{
        return prNtcInfoMapper.getCustomerNoticeListCount(request);
    }

    @Override
    public List<CustomerNoticeResponse> getCustomerNoticeList(CustomerNoticeRequest request) throws Exception{
        return prNtcInfoMapper.getCustomerNoticeList(request);
    }

    @Override
    public CustomerNoticeResponse getCustomerNoticeInfo(String ntcNo) throws Exception{
        return prNtcInfoMapper.getCustomerNoticeInfo(ntcNo);
    }

    @Override
    public List<CustomerNoticeAttachFile> getNoticeAttachedFileList(String ntcNo) throws Exception{
        return prNtcAtchFileInfoMapper.getPrNtcAtchFileList(ntcNo);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCustomerNoticeInfo( CustomerNoticeRequest request ) throws Exception{

        PrNtcInfo prNtcInfo = new PrNtcInfo();
        BeanUtils.copyProperties(prNtcInfo, request);

        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sysRegId = currentUser.getLoginId();
        prNtcInfo.setSysRegId(sysRegId);

        Validator.throwIfEmpty(prNtcInfo.getDispMediaCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"dispMediaCd"}));
        Validator.throwIfEmpty(prNtcInfo.getNtcClssCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ntcClssCd"}));
        Validator.throwIfEmpty(prNtcInfo.getBbStrDtm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbStrDtm"}));
        Validator.throwIfEmpty(prNtcInfo.getBbEndDtm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbEndDtm"}));
        Validator.throwIfEmpty(prNtcInfo.getBbYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbYn"}));
        Validator.throwIfEmpty(prNtcInfo.getUprFixYn()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"uprFixYn"}));
        Validator.throwIfEmpty(prNtcInfo.getNtcTitleNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ntcTitleNm"}));
        Validator.throwIfEmpty(prNtcInfo.getSysRegId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"sysRegId"}));

        prNtcInfoTrxMapper.insertCustomerNoticeInfo(prNtcInfo);

        cudNoticeAttachedFileInfo(prNtcInfo.getNtcNo(), request.getDeleteFileList(), request.getUploadFileList());
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifyCustomerNoticeInfo( CustomerNoticeRequest request ) throws Exception{

        PrNtcInfo prNtcInfo = new PrNtcInfo();
        BeanUtils.copyProperties(prNtcInfo, request);

        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sysModId = currentUser.getLoginId();
        prNtcInfo.setSysModId(sysModId);

        Validator.throwIfEmpty(prNtcInfo.getNtcNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ntcNo"}));
        Validator.throwIfEmpty(prNtcInfo.getBbStrDtm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbStrDtm"}));
        Validator.throwIfEmpty(prNtcInfo.getBbEndDtm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbEndDtm"}));
        Validator.throwIfEmpty(prNtcInfo.getBbYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"bbYn"}));
        Validator.throwIfEmpty(prNtcInfo.getUprFixYn()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"uprFixYn"}));
        Validator.throwIfEmpty(prNtcInfo.getNtcTitleNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ntcTitleNm"}));
        Validator.throwIfEmpty(prNtcInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"sysModId"}));

        prNtcInfoTrxMapper.updateCustomerNoticeInfo(prNtcInfo);

        cudNoticeAttachedFileInfo(prNtcInfo.getNtcNo(), request.getDeleteFileList(), request.getUploadFileList());

    }

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지첨부파일 삭제/추가
     * @param ntcNo
     * @param deleteFileList
     * @param uploadFileList
     * @throws Exception
     */
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    private void cudNoticeAttachedFileInfo(String ntcNo, List<PrNtcAtchFileInfo> deleteFileList, List<PrNtcAtchFileInfo> uploadFileList) throws Exception{

        Validator.throwIfEmpty(ntcNo, MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ntcNo"}));

        CurrentUser currentUser = (CurrentUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String sysRegId = currentUser.getLoginId();

        for ( PrNtcAtchFileInfo atchFileInfo : uploadFileList) {
            Validator.throwIfEmpty(atchFileInfo.getAtchFileNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"atchFileNm"}));
            Validator.throwIfEmpty(atchFileInfo.getAtchFileRouteNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"atchFileRouteNm"}));

            atchFileInfo.setNtcNo(ntcNo);
            atchFileInfo.setSysRegId(sysRegId);
            prNtcAtchFileInfoTrxMapper.insertPrNtcAtchFileInfo(atchFileInfo);
        }

        for ( PrNtcAtchFileInfo atchFileInfo : deleteFileList) {
            Validator.throwIfEmpty(atchFileInfo.getFileSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"fileSeq"}));

            atchFileInfo.setNtcNo(ntcNo);
            prNtcAtchFileInfoTrxMapper.deletePrNtcAtchFileInfo(atchFileInfo);
        }
    }
}
