package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.CcFotrInfoRequest;
import com.enbiz.bo.app.dto.response.display.CcFotrInfoResponse;
import com.enbiz.bo.app.entity.CcFotrInfo;
import com.enbiz.bo.app.repository.display.CcFotrInfoMapper;
import com.enbiz.bo.app.repository.display.CcFotrInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 푸터관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class FooterMgmtServiceImpl implements FooterMgmtService {

    private final CcFotrInfoMapper ccFotrInfoMapper;
    private final CcFotrInfoTrxMapper ccFotrInfoTrxMapper;

    @Override
    public int getCcFotrInfoGrpListCount(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        Validator.throwIfEmpty(ccFotrInfoRequest.getSiteNo()       , MessageResolver.getMessage("adminCommon.alert.required.parameter", new String[] {"사이트"}));
        return ccFotrInfoMapper.getCcFotrInfoGrpListCount(ccFotrInfoRequest);
    }

    @Override
    public List<CcFotrInfoResponse> getCcFotrInfoGrpList(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        Validator.throwIfEmpty(ccFotrInfoRequest.getSiteNo()       , MessageResolver.getMessage("adminCommon.alert.required.parameter", new String[] {"사이트"}));
        return ccFotrInfoMapper.getCcFotrInfoGrpList(ccFotrInfoRequest);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCcFotrInfoGroup(List<CcFotrInfo> insertList, List<CcFotrInfo> updateList, List<CcFotrInfo> deleteList) throws Exception {
        insertCcFotrInfoGrpList(insertList);
        updateCcFotrInfoGrpList(updateList);
        deleteCcFotrInfoGrpList(deleteList);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertCcFotrInfoGrpList(List<CcFotrInfo> insertList) throws Exception {
        for (CcFotrInfo ccFotrInfo : insertList) {
            Validator.throwIfEmpty(ccFotrInfo.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysGbCd()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"시스템구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getFotrContGbCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"컨텐츠구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getDispSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(ccFotrInfo.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysRegId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            Validator.throwIfLongerThan(ccFotrInfo.getDispSeq()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"전시순서","5"}));
            ccFotrInfoTrxMapper.insertCcFotrInfoGrpList(ccFotrInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateCcFotrInfoGrpList(List<CcFotrInfo> updateList) throws Exception {
        for (CcFotrInfo ccFotrInfo : updateList) {
            Validator.throwIfEmpty(ccFotrInfo.getFortNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"푸터번호"}));
            Validator.throwIfEmpty(ccFotrInfo.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysGbCd()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"시스템구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getFotrContGbCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"컨텐츠구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getDispSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(ccFotrInfo.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            Validator.throwIfLongerThan(ccFotrInfo.getDispSeq()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"전시순서","5"}));
            ccFotrInfoTrxMapper.updateCcFotrInfoGrpList(ccFotrInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteCcFotrInfoGrpList(List<CcFotrInfo> deleteList) throws Exception {
        for (CcFotrInfo ccFotrInfo : deleteList) {
            Validator.throwIfEmpty(ccFotrInfo.getFortNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"푸터번호"}));
            ccFotrInfoTrxMapper.deleteCcFotrInfoGrpList(ccFotrInfo);
        }
    }

    public CcFotrInfoResponse getFooterMgmtCont(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        return ccFotrInfoMapper.getFooterMgmtCont(ccFotrInfoRequest);
    }

    public void updateCcFotrCont(CcFotrInfo ccFotrInfo) throws Exception {
        ccFotrInfoTrxMapper.updateCcFotrCont(ccFotrInfo);
    }

    @Override
    public int getCcFotrInfoMenuListCount(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        return ccFotrInfoMapper.getCcFotrInfoMenuListCount(ccFotrInfoRequest);
    }

    @Override
    public List<CcFotrInfoResponse> getCcFotrInfoMenuList(CcFotrInfoRequest ccFotrInfoRequest) throws Exception {
        return ccFotrInfoMapper.getCcFotrInfoMenuList(ccFotrInfoRequest);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveCcFotrInfoMenu(List<CcFotrInfo> insertList, List<CcFotrInfo> updateList, List<CcFotrInfo> deleteList) throws Exception{
        insertCcFotrInfoMenuList(insertList);
        updateCcFotrInfoMenuList(updateList);
        deleteCcFotrInfoMenuList(deleteList);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertCcFotrInfoMenuList(List<CcFotrInfo> insertList) throws Exception {
        for (CcFotrInfo ccFotrInfo : insertList) {
            Validator.throwIfEmpty(ccFotrInfo.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysGbCd()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"시스템구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getFotrContGbCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"컨텐츠구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getDispSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(ccFotrInfo.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysRegId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            if(ccFotrInfo.getFotrContGbCd().equals("10")) {
                Validator.throwIfEmpty(ccFotrInfo.getMenuNm()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"메뉴명"}));
                Validator.throwIfEmpty(ccFotrInfo.getLinkUrl()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
                Validator.throwIfEmpty(ccFotrInfo.getMovFrmeCd()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동프레임코드"}));
                Validator.throwIfEmpty(ccFotrInfo.getUprFotrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상위푸터번호"}));
                Validator.throwIfLongerThan(ccFotrInfo.getMenuNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"메뉴명","200"}));
                Validator.throwIfLongerThan(ccFotrInfo.getLinkUrl()  ,1000,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"연결URL","1000"}));
                Validator.throwIfLongerThan(ccFotrInfo.getMovFrmeCd()  ,10,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"이동프레임코드","10"}));
                Validator.throwIfLongerThan(ccFotrInfo.getUprFotrNo()  ,15,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"상위푸터번호","15"}));
            } else if(ccFotrInfo.getFotrContGbCd().equals("20")){
                Validator.throwIfEmpty(ccFotrInfo.getFotrCont()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"푸터컨텐츠"}));
            }
            Validator.throwIfLongerThan(ccFotrInfo.getDispSeq()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"전시순서","5"}));
            ccFotrInfoTrxMapper.insertCcFotrInfoMenuList(ccFotrInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateCcFotrInfoMenuList(List<CcFotrInfo> updateList) throws Exception {
        for (CcFotrInfo ccFotrInfo : updateList) {
            Validator.throwIfEmpty(ccFotrInfo.getFortNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"푸터번호"}));
            Validator.throwIfEmpty(ccFotrInfo.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysGbCd()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"시스템구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getFotrContGbCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"컨텐츠구분"}));
            Validator.throwIfEmpty(ccFotrInfo.getDispSeq()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
            Validator.throwIfEmpty(ccFotrInfo.getUseYn()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(ccFotrInfo.getSysModId()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            if(ccFotrInfo.getFotrContGbCd().equals("10")) {
                Validator.throwIfEmpty(ccFotrInfo.getMenuNm()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"메뉴명"}));
                Validator.throwIfEmpty(ccFotrInfo.getLinkUrl()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"연결URL"}));
                Validator.throwIfEmpty(ccFotrInfo.getMovFrmeCd()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"이동프레임코드"}));
                Validator.throwIfEmpty(ccFotrInfo.getUprFotrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"상위푸터번호"}));
                Validator.throwIfLongerThan(ccFotrInfo.getMenuNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"메뉴명","200"}));
                Validator.throwIfLongerThan(ccFotrInfo.getLinkUrl()  ,1000,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"연결URL","1000"}));
                Validator.throwIfLongerThan(ccFotrInfo.getMovFrmeCd()  ,10,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"이동프레임코드","10"}));
                Validator.throwIfLongerThan(ccFotrInfo.getUprFotrNo()  ,15,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"상위푸터번호","15"}));
            } else if(ccFotrInfo.getFotrContGbCd().equals("20")){
                Validator.throwIfEmpty(ccFotrInfo.getFotrCont()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"푸터컨텐츠"}));
            }
            Validator.throwIfLongerThan(ccFotrInfo.getDispSeq()  ,5,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"전시순서","5"}));
            ccFotrInfoTrxMapper.updateCcFotrInfoMenuList(ccFotrInfo);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteCcFotrInfoMenuList(List<CcFotrInfo> deleteList) throws Exception {
        for (CcFotrInfo ccFotrInfo : deleteList) {
            Validator.throwIfEmpty(ccFotrInfo.getFortNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"푸터번호"}));
            ccFotrInfoTrxMapper.deleteCcFotrInfoMenuList(ccFotrInfo);
        }
    }

}
