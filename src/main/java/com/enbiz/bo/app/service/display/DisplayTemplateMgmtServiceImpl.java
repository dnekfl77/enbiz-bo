package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;
import com.enbiz.bo.app.entity.PrTmplBase;
import com.enbiz.bo.app.entity.PrTmplConrMappInfo;
import com.enbiz.bo.app.repository.display.PrTmplBaseMapper;
import com.enbiz.bo.app.repository.display.PrTmplBaseTrxMapper;
import com.enbiz.bo.app.repository.display.PrTmplConrMappInfoMapper;
import com.enbiz.bo.app.repository.display.PrTmplConrMappInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전시 템플릿 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class DisplayTemplateMgmtServiceImpl implements DisplayTemplateMgmtService {

    private final PrTmplBaseMapper prTmplBaseMapper;
    private final PrTmplBaseTrxMapper prTmplBaseTrxMapper;
    private final PrTmplConrMappInfoMapper prTmplConrMappInfoMapper;
    private final PrTmplConrMappInfoTrxMapper prTmplConrMappInfoTrxMapper;

    @Override
    public List<PrTmplBaseResponse> getDisplayTemplateList(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        return prTmplBaseMapper.getDisplayTemplateList(prTmplBaseRequest);
    }

    @Override
    public int getDisplayTemplateListCount(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        return prTmplBaseMapper.getDisplayTemplateListCount(prTmplBaseRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void createDisplayTemplate(List<PrTmplBase> createList) throws Exception {
        for (PrTmplBase prTmplBase : createList) {
            Validator.throwIfEmpty(prTmplBase.getTmplNm()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿명"}));
            Validator.throwIfEmpty(prTmplBase.getTmplTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 유형"}));
            Validator.throwIfEmpty(prTmplBase.getTmplFilePath(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 파일경로"}));
            Validator.throwIfEmpty(prTmplBase.getUseYn()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prTmplBase.getSysRegId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(prTmplBase.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            Validator.throwIfLongerThan(prTmplBase.getTmplNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"템플릿명","200"}));
            int idx = prTmplBase.getTmplFilePath().lastIndexOf("/");
            String path = prTmplBase.getTmplFilePath().substring(0,idx+1);
            String file = prTmplBase.getTmplFilePath().substring(idx+1);
            prTmplBase.setTmplPathNm(path);
            prTmplBase.setTmplFileNm(file);
            Validator.throwIfLongerThan(prTmplBase.getTmplPathNm()  ,1000,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"템플릿경로명","1000"}));
            Validator.throwIfLongerThan(prTmplBase.getTmplFileNm()  ,300,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"템플릿파일명","300"}));
            prTmplBaseTrxMapper.createDisplayTemplate(prTmplBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateDisplayTemplate(List<PrTmplBase> updateList) throws Exception {
        for (PrTmplBase prTmplBase : updateList) {
            Validator.throwIfEmpty(prTmplBase.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
            Validator.throwIfEmpty(prTmplBase.getTmplNm()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿명"}));
            Validator.throwIfEmpty(prTmplBase.getTmplTypCd()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 유형"}));
            Validator.throwIfEmpty(prTmplBase.getTmplFilePath(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 파일경로"}));
            Validator.throwIfEmpty(prTmplBase.getUseYn()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prTmplBase.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            Validator.throwIfLongerThan(prTmplBase.getTmplNm()  ,200,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"템플릿명","200"}));
            int idx = prTmplBase.getTmplFilePath().lastIndexOf("/");
            String path = prTmplBase.getTmplFilePath().substring(0,idx+1);
            String file = prTmplBase.getTmplFilePath().substring(idx+1);

            prTmplBase.setTmplPathNm(path);
            prTmplBase.setTmplFileNm(file);
            Validator.throwIfLongerThan(prTmplBase.getTmplPathNm()  ,1000,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"템플릿경로명","1000"}));
            Validator.throwIfLongerThan(prTmplBase.getTmplFileNm()  ,300,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"템플릿파일명","300"}));
            prTmplBaseTrxMapper.updateDisplayTemplate(prTmplBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteDisplayTemplate(List<PrTmplBase> deleteList) throws Exception {
        for (PrTmplBase prTmplBase : deleteList) {
            Validator.throwIfEmpty(prTmplBase.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
            prTmplBaseTrxMapper.deleteDisplayTemplate(prTmplBase); // 전시코너기본테이블 삭제
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(List<PrTmplBase> createList, List<PrTmplBase> updateList, List<PrTmplBase> deleteList) throws Exception {
        createDisplayTemplate(createList);
        updateDisplayTemplate(updateList);
        deleteDisplayTemplate(deleteList);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkPrTmplConrMappInfo(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        Validator.throwIfEmpty(prTmplBaseRequest.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
        int cnt = prTmplBaseMapper.checkPrTmplConrMappInfo(prTmplBaseRequest);
        return cnt <= 0;
    }

    @Override
    public List<PrTmplConrMappInfoResponse> getDisplayCornerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfoRequest.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
        return prTmplConrMappInfoMapper.getDisplayCornerList(prTmplConrMappInfoRequest);
    }

    @Override
    public int getDisplayCornerListCount(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfoRequest.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
        return prTmplConrMappInfoMapper.getDisplayCornerListCount(prTmplConrMappInfoRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void createDisplayCorner(List<PrTmplConrMappInfo> createList) throws Exception {
        for (PrTmplConrMappInfo prTmplConrMappInfo : createList) {
            Validator.throwIfEmpty(prTmplConrMappInfo.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getConrNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너 번호"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getDispYn()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getDispStrDtm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시시작일시"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getDispEndDtm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시종료일시"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getSysRegId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prTmplConrMappInfoTrxMapper.createDisplayCorner(prTmplConrMappInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateDisplayCorner(List<PrTmplConrMappInfo> updateList) throws Exception {
        for (PrTmplConrMappInfo prTmplConrMappInfo : updateList) {
            Validator.throwIfEmpty(prTmplConrMappInfo.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getConrNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너 번호"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getDispYn()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시여부"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getDispStrDtm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시시작일시"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getDispEndDtm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시종료일시"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getSysModId()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prTmplConrMappInfoTrxMapper.updateDisplayCorner(prTmplConrMappInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteDisplayCorner(List<PrTmplConrMappInfo> deleteList) throws Exception {
        for (PrTmplConrMappInfo prTmplConrMappInfo : deleteList) {
            Validator.throwIfEmpty(prTmplConrMappInfo.getTmplNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿 번호"}));
            Validator.throwIfEmpty(prTmplConrMappInfo.getConrNo()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너 번호"}));
            prTmplConrMappInfoTrxMapper.deleteDisplayCorner(prTmplConrMappInfo);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void cornerRegistCUD(List<PrTmplConrMappInfo> createList, List<PrTmplConrMappInfo> updateList, List<PrTmplConrMappInfo> deleteList) throws Exception {
        createDisplayCorner(createList);
        updateDisplayCorner(updateList);
        deleteDisplayCorner(deleteList);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkPrDispConrInfo(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfoRequest.getConrNo(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        int cnt = prTmplBaseMapper.checkPrDispConrInfo(prTmplConrMappInfoRequest);
        return cnt <= 0;
    }
}
