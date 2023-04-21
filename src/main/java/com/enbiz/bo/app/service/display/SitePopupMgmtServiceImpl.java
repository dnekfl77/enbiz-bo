package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrSitePopupChlAplyInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrSitePopupInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrSitePopupChlAplyInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrSitePopupInfoResponse;
import com.enbiz.bo.app.entity.PrSitePopupChlAplyInfo;
import com.enbiz.bo.app.entity.PrSitePopupInfo;
import com.enbiz.bo.app.entity.PrSitePopupTgtScrn;
import com.enbiz.bo.app.repository.display.PrSitePopupChlAplyInfoMapper;
import com.enbiz.bo.app.repository.display.PrSitePopupChlAplyInfoTrxMapper;
import com.enbiz.bo.app.repository.display.PrSitePopupInfoMapper;
import com.enbiz.bo.app.repository.display.PrSitePopupInfoTrxMapper;
import com.enbiz.bo.app.repository.display.PrSitePopupTgtScrnTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 팝업 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SitePopupMgmtServiceImpl implements SitePopupMgmtService {

    private final PrSitePopupInfoMapper prSitePopupInfoMapper;
    private final PrSitePopupInfoTrxMapper prSitePopupInfoTrxMapper;
    private final PrSitePopupTgtScrnTrxMapper prSitePopupTgtScrnTrxMapper;
    private final PrSitePopupChlAplyInfoMapper prSitePopupChlAplyInfoMapper;
    private final PrSitePopupChlAplyInfoTrxMapper prSitePopupChlAplyInfoTrxMapper;

    @Override
    public List<PrSitePopupInfoResponse> getSitePopupList(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        return prSitePopupInfoMapper.getSitePopupList(prSitePopupInfoRequest);
    }

    @Override
    public int getSitePopupListCount(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        return prSitePopupInfoMapper.getSitePopupListCount(prSitePopupInfoRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteSitePopupList(PrSitePopupInfo prSitePopupInfo)  throws Exception {
        String[] popupNoList = prSitePopupInfo.getPopupNo().split(",");
        for (String popupNo : popupNoList) {
            Validator.throwIfEmpty(popupNo     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
            prSitePopupInfoTrxMapper.deleteSitePopupList(popupNo);
            prSitePopupInfoTrxMapper.deleteSitePopupTgtScrnList(popupNo);
            prSitePopupInfoTrxMapper.deleteSitePopupChlAplyInfoList(popupNo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void prSitePopupInfoInsert(List<String> popupTgtScrnList, PrSitePopupInfo prSitePopupInfo) throws Exception {
        Validator.throwIfEmpty(prSitePopupInfo.getPopupNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업명"}));
        Validator.throwIfEmpty(prSitePopupInfo.getSiteNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupDispStrDtm()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업전시시작일시"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupDispEndDtm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업전시종료일시"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업유형코드"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPrioRnk()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"우선순위"}));
        Validator.throwIfEmpty(prSitePopupInfo.getDispMediaCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시매체코드"}));
        Validator.throwIfEmpty(prSitePopupInfo.getUseYn()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prSitePopupInfo.getSysRegId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prSitePopupInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prSitePopupInfoTrxMapper.prSitePopupInfoInsert(prSitePopupInfo);
        String popupNo = prSitePopupInfo.getPopupNo();
        if(popupTgtScrnList.size() != 0) { // 대상화면
            for (String popupTgtScrnCd : popupTgtScrnList){
                PrSitePopupTgtScrn prSitePopupTgtScrn = new PrSitePopupTgtScrn();
                Validator.throwIfEmpty(popupNo     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
                Validator.throwIfEmpty(popupTgtScrnCd     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업대상화면코드"}));
                Validator.throwIfEmpty(prSitePopupInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                Validator.throwIfEmpty(prSitePopupInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                prSitePopupTgtScrn.setPopupNo(popupNo);
                prSitePopupTgtScrn.setPopupTgtScrnCd(popupTgtScrnCd);
                prSitePopupTgtScrn.setSysModId(prSitePopupInfo.getSysModId());
                prSitePopupTgtScrn.setSysRegId(prSitePopupInfo.getSysRegId());
                prSitePopupTgtScrnTrxMapper.prSitePopupTgtScrnInsert(prSitePopupTgtScrn);
            }
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void prSitePopupInfoUpdate(List<String> popupTgtScrnList, PrSitePopupInfo prSitePopupInfo) throws Exception {
        Validator.throwIfEmpty(prSitePopupInfo.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupNm()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업명"}));
        Validator.throwIfEmpty(prSitePopupInfo.getSiteNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupDispStrDtm()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업전시시작일시"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupDispEndDtm()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업전시종료일시"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPopupTypCd()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업유형코드"}));
        Validator.throwIfEmpty(prSitePopupInfo.getPrioRnk()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"우선순위"}));
        Validator.throwIfEmpty(prSitePopupInfo.getDispMediaCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시매체코드"}));
        Validator.throwIfEmpty(prSitePopupInfo.getUseYn()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prSitePopupInfo.getSysRegId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prSitePopupInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prSitePopupInfoTrxMapper.prSitePopupInfoUpdate(prSitePopupInfo);
        String popupNo = prSitePopupInfo.getPopupNo();
        if(popupTgtScrnList.size() != 0) { // 대상화면
            prSitePopupInfoTrxMapper.deleteSitePopupTgtScrnList(prSitePopupInfo.getPopupNo()); // 삭제 후 새로 저장
            for (String popupTgtScrnCd : popupTgtScrnList){
                PrSitePopupTgtScrn prSitePopupTgtScrn = new PrSitePopupTgtScrn();
                Validator.throwIfEmpty(popupNo     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
                Validator.throwIfEmpty(popupTgtScrnCd     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업대상화면코드"}));
                Validator.throwIfEmpty(prSitePopupInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                Validator.throwIfEmpty(prSitePopupInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                prSitePopupTgtScrn.setPopupNo(popupNo);
                prSitePopupTgtScrn.setPopupTgtScrnCd(popupTgtScrnCd);
                prSitePopupTgtScrn.setSysModId(prSitePopupInfo.getSysModId());
                prSitePopupTgtScrn.setSysRegId(prSitePopupInfo.getSysRegId());
                prSitePopupTgtScrnTrxMapper.prSitePopupTgtScrnInsert(prSitePopupTgtScrn);
            }
        }
    }

    @Override
    public PrSitePopupInfoResponse getSitePopupDetail(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        Validator.throwIfEmpty(prSitePopupInfoRequest.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        return prSitePopupInfoMapper.getSitePopupDetail(prSitePopupInfoRequest);
    }

    @Override
    public List<PrSitePopupChlAplyInfoResponse> getSitePopupChlAplyInfo(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        Validator.throwIfEmpty(prSitePopupInfoRequest.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        return prSitePopupChlAplyInfoMapper.getSitePopupChlAplyInfo(prSitePopupInfoRequest);
    }

    @Override
    public int getSitePopupChlAplyInfoCount(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception {
        Validator.throwIfEmpty(prSitePopupInfoRequest.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        return prSitePopupChlAplyInfoMapper.getSitePopupChlAplyInfoCount(prSitePopupInfoRequest);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo) throws Exception {
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getChlNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prSitePopupChlAplyInfoTrxMapper.insertSitePopupChlAplyInfo(prSitePopupChlAplyInfo);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo) throws Exception {
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getChlNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prSitePopupChlAplyInfoTrxMapper.updateSitePopupChlAplyInfo(prSitePopupChlAplyInfo);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo) throws Exception {
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getPopupNo()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        Validator.throwIfEmpty(prSitePopupChlAplyInfo.getChlNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"팝업번호"}));
        prSitePopupChlAplyInfoTrxMapper.deleteSitePopupChlAplyInfo(prSitePopupChlAplyInfo);
    }

    @Override
    public void prSitePopupChlAplyInfoSave(List<PrSitePopupChlAplyInfoRequest> gridList) throws Exception {
        for(PrSitePopupChlAplyInfoRequest prSitePopupChlAplyInfoRequest : gridList) {
            PrSitePopupChlAplyInfo prSitePopupChlAplyInfo = new PrSitePopupChlAplyInfo();
            BeanUtils.copyProperties(prSitePopupChlAplyInfoRequest, prSitePopupChlAplyInfo);
            switch (prSitePopupChlAplyInfoRequest.getState()){
                case "created" :  insertSitePopupChlAplyInfo(prSitePopupChlAplyInfo); break;
                case "updated" :  updateSitePopupChlAplyInfo(prSitePopupChlAplyInfo); break;
                case "deleted" :  deleteSitePopupChlAplyInfo(prSitePopupChlAplyInfo); break;
            }
        }
    }
}
