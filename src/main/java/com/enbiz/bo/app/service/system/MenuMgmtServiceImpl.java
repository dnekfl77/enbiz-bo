package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.RtTargetBaseCudRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StRtTgtBase;
import com.enbiz.bo.app.repository.system.StRtTgtBaseMapper;
import com.enbiz.bo.app.repository.system.StRtTgtBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 메뉴관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class MenuMgmtServiceImpl implements MenuMgmtService{

    private final StRtTgtBaseMapper stRtTgtBaseMapper;
    private final StRtTgtBaseTrxMapper stRtTgtBaseTrxMapper;

    @Override
    public List<RtTargetBaseResponse> getMenuMgmtTreeList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        Validator.throwIfEmpty(RtTargetBaseRequest.getSysGbCd()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템구분코드"}));
        return stRtTgtBaseMapper.getMenuMgmtTreeList(RtTargetBaseRequest);
    }

    @Override
    public RtTargetBaseResponse getMenuInfo(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return stRtTgtBaseMapper.getMenuInfo(RtTargetBaseRequest);
    }

    @Override
    public int getSubMenuListCount(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return stRtTgtBaseMapper.getSubMenuListCount(RtTargetBaseRequest);
    }

    @Override
    public List<RtTargetBaseResponse> getSubMenuList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return stRtTgtBaseMapper.getSubMenuList(RtTargetBaseRequest);
    }

    @Override
    public void registMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception {
        StRtTgtBase stRtTgtBase = new StRtTgtBase();
        BeanUtils.copyProperties(stRtTgtBase, RtTargetBaseCudRequest);
        Validator.throwIfEmpty(stRtTgtBase.getSysGbCd()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템구분코드"}));
        Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상유형코드"}));
        Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상명"}));
        Validator.throwIfEmpty(stRtTgtBase.getSortSeq()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
        Validator.throwIfEmpty(stRtTgtBase.getUseYn()          , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));
        Validator.throwIfEmpty(stRtTgtBase.getUprRtTgtSeq()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"상위권한대상순번"}));
        Validator.throwIfEmpty(stRtTgtBase.getSysRegId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템등록자ID"}));
        Validator.throwIfEmpty(stRtTgtBase.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템수정자ID"}));
        stRtTgtBaseTrxMapper.insertMenuInfo(stRtTgtBase);
    }

    @Override
    public void modifyMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception {
        StRtTgtBase stRtTgtBase = new StRtTgtBase();
        BeanUtils.copyProperties(stRtTgtBase, RtTargetBaseCudRequest);
        Validator.throwIfEmpty(stRtTgtBase.getRtTgtSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상순번"}));
        Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상유형코드"}));
        Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상명"}));
        Validator.throwIfEmpty(stRtTgtBase.getSortSeq()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
        Validator.throwIfEmpty(stRtTgtBase.getUseYn()          , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));
        Validator.throwIfEmpty(stRtTgtBase.getCustInfoInclYn() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"고객정보포함여부"}));
        Validator.throwIfEmpty(stRtTgtBase.getPopupYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"팝업여부"}));
        Validator.throwIfEmpty(stRtTgtBase.getLeafMenuYn()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"최하위메뉴여부"}));
        Validator.throwIfEmpty(stRtTgtBase.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템수정자ID"}));
        stRtTgtBaseTrxMapper.updateMenuDtlInfo(stRtTgtBase);
    }

    @Override
    public void registSubMenu(List<StRtTgtBase> createList) throws Exception {
        for (StRtTgtBase stRtTgtBase : createList) {
            Validator.throwIfEmpty(stRtTgtBase.getSysGbCd()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템구분코드"}));
            Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상유형코드"}));
            Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상명"}));
            Validator.throwIfEmpty(stRtTgtBase.getSortSeq()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
            Validator.throwIfEmpty(stRtTgtBase.getUseYn()          , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));
            Validator.throwIfEmpty(stRtTgtBase.getUprRtTgtSeq()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"상위권한대상순번"}));
            Validator.throwIfEmpty(stRtTgtBase.getSysRegId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템등록자ID"}));
            Validator.throwIfEmpty(stRtTgtBase.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템수정자ID"}));
            stRtTgtBaseTrxMapper.insertMenuInfo(stRtTgtBase);
        }
    }

    @Override
    public void modifySubMenu(List<StRtTgtBase> updateList) throws Exception {
        for (StRtTgtBase stRtTgtBase : updateList) {
            Validator.throwIfEmpty(stRtTgtBase.getRtTgtSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상순번"}));
            Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상유형코드"}));
            Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상명"}));
            Validator.throwIfEmpty(stRtTgtBase.getSortSeq()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"정렬순서"}));
            Validator.throwIfEmpty(stRtTgtBase.getUseYn()          , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"사용여부"}));
            Validator.throwIfEmpty(stRtTgtBase.getPopupYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"팝업여부"}));
            Validator.throwIfEmpty(stRtTgtBase.getUprRtTgtSeq()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"상위권한대상순번"}));
            Validator.throwIfEmpty(stRtTgtBase.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템수정자ID"}));
            stRtTgtBaseTrxMapper.updateSubMenu(stRtTgtBase);
        }
    }

    @Override
    public void deleteSubMenu(List<StRtTgtBase> deleteList) throws Exception {
        for (StRtTgtBase stRtTgtBase : deleteList) {
            Validator.throwIfEmpty(stRtTgtBase.getRtTgtSeq()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"권한대상순번"}));
            stRtTgtBaseTrxMapper.deleteSubMenu(stRtTgtBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveSubMenu(List<StRtTgtBase> createList, List<StRtTgtBase> updateList, List<StRtTgtBase> deleteList) throws Exception {
        registSubMenu(createList);
        modifySubMenu(updateList);
        deleteSubMenu(deleteList);
    }

    @Override
    public int getSubMenuCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return stRtTgtBaseMapper.getSubMenuCheck(RtTargetBaseRequest);
    }

    @Override
    public int getRtInfoCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return stRtTgtBaseMapper.getStRtInfoCheck(RtTargetBaseRequest);
    }
}
