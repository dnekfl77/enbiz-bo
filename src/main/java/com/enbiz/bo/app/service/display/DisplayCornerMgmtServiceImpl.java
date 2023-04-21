package com.enbiz.bo.app.service.display;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.entity.PrConrBase;
import com.enbiz.bo.app.entity.PrConrTgtInfo;
import com.enbiz.bo.app.entity.PrTmplConrMappInfo;
import com.enbiz.bo.app.repository.display.PrConrBaseMapper;
import com.enbiz.bo.app.repository.display.PrConrBaseTrxMapper;
import com.enbiz.bo.app.repository.display.PrConrTgtInfoMapper;
import com.enbiz.bo.app.repository.display.PrConrTgtInfoTrxMapper;
import com.enbiz.bo.app.repository.display.PrTmplConrMappInfoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전시코너 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class DisplayCornerMgmtServiceImpl implements DisplayCornerMgmtService {

    private final PrConrBaseMapper prConrBaseMapper;
    private final PrConrBaseTrxMapper prConrBaseTrxMapper;
    private final PrConrTgtInfoMapper prConrTgtInfoMapper;
    private final PrConrTgtInfoTrxMapper prConrTgtInfoTrxMapper;
    private final PrTmplConrMappInfoTrxMapper prTmplConrMappInfoTrxMapper;


    @Override
    public List<PrConrBaseResponse> getDisplayCornerList(PrConrBaseRequest prConrBaseRequest) throws Exception {
        return prConrBaseMapper.getDisplayCornerList(prConrBaseRequest);
    }

    @Override
    public int getDisplayCornerListCount(PrConrBaseRequest prConrBaseRequest) throws Exception {
        return prConrBaseMapper.getDisplayCornerListCount(prConrBaseRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateDisplayCornerBase(List<PrConrBase> updateList) throws Exception {
        for (PrConrBase prConrBase : updateList) {
            Validator.throwIfEmpty(prConrBase.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
            Validator.throwIfEmpty(prConrBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
            Validator.throwIfEmpty(prConrBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prConrBaseTrxMapper.updateDisplayCornerBase(prConrBase);
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deleteDisplayCornerBase(List<PrConrBase> deleteList) throws Exception {
        for (PrConrBase prConrBase : deleteList) {
            Validator.throwIfEmpty(prConrBase.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
            prConrBaseTrxMapper.deleteDisplayCornerBase(prConrBase); // 전시코너기본테이블 삭제
            prConrTgtInfoTrxMapper.deleteDisplayCorner(prConrBase); // 코너대상정보테이블 삭제
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(List<PrConrBase> updateList, List<PrConrBase> deleteList) throws Exception {
        updateDisplayCornerBase(updateList);
        deleteDisplayCornerBase(deleteList);
    }

    @Override
    public List<PrTmplBaseResponse> getTmplConrMappInfo(PrConrBaseRequest prConrBaseRequest) throws Exception {
        Validator.throwIfEmpty(prConrBaseRequest.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        return prConrBaseMapper.getTmplConrMappInfo(prConrBaseRequest);
    }

    @Override
    public int getTmplConrMappInfoCount(PrConrBaseRequest prConrBaseRequest) throws Exception {
        Validator.throwIfEmpty(prConrBaseRequest.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        return prConrBaseMapper.getTmplConrMappInfoCount(prConrBaseRequest);
    }

    @Override
    public PrConrBaseResponse getDisplayCornerDetail(PrConrBaseRequest prConrBaseRequest) throws Exception {
        Validator.throwIfEmpty(prConrBaseRequest.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        return prConrBaseMapper.getDisplayCornerDetail(prConrBaseRequest);
    }

    @Override
    public List<PrConrTgtInfoResponse> getCornerTargetInfoList(PrConrBaseRequest prConrBaseRequest) throws Exception {
        Validator.throwIfEmpty(prConrBaseRequest.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        return prConrTgtInfoMapper.getCornerTargetInfoList(prConrBaseRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void prConrBaseInsert(PrConrBase prConrBase, List<PrConrTgtInfoRequest> conrTgt) throws Exception {
        Validator.throwIfEmpty(prConrBase.getConrNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너명"}));
        Validator.throwIfEmpty(prConrBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prConrBase.getAempId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"담당자ID"}));
        Validator.throwIfEmpty(prConrBase.getSetUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"세트사용여부"}));
        Validator.throwIfEmpty(prConrBase.getSetCnt()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"세트갯수"}));
        Validator.throwIfEmpty(prConrBase.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prConrBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prConrBaseTrxMapper.prConrBaseInsert(prConrBase);
        // 전시대상정보
        PrConrTgtInfo prConrTgtInfo = new PrConrTgtInfo();
        String uprConrTgtNo = null;
        for (int i = 0; i < conrTgt.size(); i++) {
            BeanUtils.copyProperties(conrTgt.get(i), prConrTgtInfo);
            prConrTgtInfo.setConrNo(prConrBase.getConrNo());
            prConrTgtInfo.setSysRegId(prConrBase.getSysRegId());
            prConrTgtInfo.setSysModId(prConrBase.getSysModId());
            if (prConrTgtInfo.getDpthNo().equals("1")) { // 세트인 경우 세트명 행 / 세트 사용안함인 경우 일반행
                Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getConrTgtNm() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상명"}));
                Validator.throwIfEmpty(prConrTgtInfo.getDpthNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"깊이번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                Validator.throwIfEmpty(prConrTgtInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                prConrTgtInfoTrxMapper.insertPrConrTgtInfo(prConrTgtInfo);
                uprConrTgtNo = prConrTgtInfo.getConrTgtNo();
            } else { // 이외의 행
                prConrTgtInfo.setUprConrTgtNo(uprConrTgtNo);
                Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getConrTgtCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상코드"}));
                Validator.throwIfEmpty(prConrTgtInfo.getConrTgtCnt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상수"}));
                Validator.throwIfEmpty(prConrTgtInfo.getDispSeq()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
                Validator.throwIfEmpty(prConrTgtInfo.getDpthNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"깊이번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                Validator.throwIfEmpty(prConrTgtInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                prConrTgtInfoTrxMapper.insertPrConrTgtInfoUprConrTgtNo(prConrTgtInfo);
            }
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void prConrBaseUpdate(PrConrBase prConrBase, List<PrConrTgtInfoRequest> conrTgt, String removeConrTgt) throws Exception {
        Validator.throwIfEmpty(prConrBase.getConrNo()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        Validator.throwIfEmpty(prConrBase.getConrNm()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너명"}));
        Validator.throwIfEmpty(prConrBase.getUseYn()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사용여부"}));
        Validator.throwIfEmpty(prConrBase.getAempId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"담당자ID"}));
        Validator.throwIfEmpty(prConrBase.getSetUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"세트사용여부"}));
        Validator.throwIfEmpty(prConrBase.getSetCnt()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"세트갯수"}));
        Validator.throwIfEmpty(prConrBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prConrBaseTrxMapper.prConrBaseUpdate(prConrBase);

        // 전시 대상 화면
        PrConrTgtInfo prConrTgtInfo = new PrConrTgtInfo();
        String uprConrTgtNo = null;
        for (int i = 0; i < conrTgt.size(); i++) {
            BeanUtils.copyProperties(conrTgt.get(i), prConrTgtInfo);
            prConrTgtInfo.setConrNo(prConrBase.getConrNo());
            prConrTgtInfo.setSysRegId(prConrBase.getSysRegId());
            prConrTgtInfo.setSysModId(prConrBase.getSysModId());
            if (prConrTgtInfo.getConrTgtNo().equals("")) { // 새로 추가된행
                if (prConrTgtInfo.getDpthNo().equals("1")) { // 세트인 경우 세트명 행 / 세트 사용안함인 경우 일반행
                    Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getConrTgtNm() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상명"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getDpthNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"깊이번호"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                    prConrTgtInfoTrxMapper.insertPrConrTgtInfo(prConrTgtInfo);
                    uprConrTgtNo = prConrTgtInfo.getConrTgtNo();
                } else { // 이외의 행
                    prConrTgtInfo.setUprConrTgtNo(uprConrTgtNo);
                    Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getConrTgtCd() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상코드"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getConrTgtCnt(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상수"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getDispSeq()   , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"전시순서"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getDpthNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"깊이번호"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                    prConrTgtInfoTrxMapper.insertPrConrTgtInfoUprConrTgtNo(prConrTgtInfo);
                }
            } else { // 기존의  전시 대상 화면에서 정보가 수정된 행
                Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getConrTgtNo() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getDpthNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"깊이번호"}));
                Validator.throwIfEmpty(prConrTgtInfo.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
                Validator.throwIfEmpty(prConrTgtInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
                prConrTgtInfoTrxMapper.updatePrConrTgtInfo(prConrTgtInfo);
                if (prConrTgtInfo.getDpthNo().equals("1")) {
                    uprConrTgtNo = prConrTgtInfo.getConrTgtNo();
                }
            }
        }

        // 전시 대상 화면에 삭제할 리스트
        if(!removeConrTgt.equals("")){
            String[] params = removeConrTgt.split(",");
            for (String item : params){
                if(!item.equals("")){
                    prConrTgtInfo.setConrNo(prConrBase.getConrNo());
                    prConrTgtInfo.setConrTgtNo(item);
                    Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
                    Validator.throwIfEmpty(prConrTgtInfo.getConrTgtNo() , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너대상번호"}));
                    prConrTgtInfoTrxMapper.deletePrConrTgtInfo(prConrTgtInfo);
                }
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertPrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfo.getTmplNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        Validator.throwIfEmpty(prTmplConrMappInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        Validator.throwIfEmpty(prTmplConrMappInfo.getSysRegId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
        Validator.throwIfEmpty(prTmplConrMappInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prTmplConrMappInfoTrxMapper.insertPrTmplConrMappInfo(prTmplConrMappInfo);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updatePrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfo.getTmplNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        Validator.throwIfEmpty(prTmplConrMappInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        Validator.throwIfEmpty(prTmplConrMappInfo.getSysModId()  , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
        prTmplConrMappInfoTrxMapper.updatePrTmplConrMappInfo(prTmplConrMappInfo);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void deletePrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo) throws Exception {
        Validator.throwIfEmpty(prTmplConrMappInfo.getTmplNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"템플릿번호"}));
        Validator.throwIfEmpty(prTmplConrMappInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        prTmplConrMappInfoTrxMapper.deletePrTmplConrMappInfo(prTmplConrMappInfo);
    }

    @Override
    public void prTmplConrMappInfoSave(List<PrTmplConrMappInfoRequest> gridList) throws Exception {
        for(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest : gridList) {
            PrTmplConrMappInfo prTmplConrMappInfo = new PrTmplConrMappInfo();
            BeanUtils.copyProperties(prTmplConrMappInfoRequest, prTmplConrMappInfo);
            switch (prTmplConrMappInfoRequest.getState()){
                case "created" :  insertPrTmplConrMappInfo(prTmplConrMappInfo); break;
                case "updated" :  updatePrTmplConrMappInfo(prTmplConrMappInfo); break;
                case "deleted" :  deletePrTmplConrMappInfo(prTmplConrMappInfo); break;
            }
        }
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkPrConrSetInfo(PrConrTgtInfo prConrTgtInfo) throws Exception {
        Validator.throwIfEmpty(prConrTgtInfo.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        int cnt = prConrBaseMapper.checkPrConrSetInfo(prConrTgtInfo);
        return cnt <= 0;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkPrDispConrInfo(PrConrBase prConrBase) throws Exception {
        Validator.throwIfEmpty(prConrBase.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        int cnt = prConrBaseMapper.checkPrDispConrInfo(prConrBase);
        return cnt <= 0;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public boolean checkPrTmplConrMappInfo(PrConrBase prConrBase) throws Exception {
        Validator.throwIfEmpty(prConrBase.getConrNo()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"코너번호"}));
        int cnt = prConrBaseMapper.checkPrTmplConrMappInfo(prConrBase);
        return cnt <= 0;
    }

    @Override
    public List<PrConrBaseResponse> getCornerListPopup(PrConrBaseRequest prConrBaseRequest) throws Exception {
        return prConrBaseMapper.getCornerListPopup(prConrBaseRequest);
    }

    @Override
    public int getCornerListPopupCount(PrConrBaseRequest prConrBaseRequest) throws Exception {
        return prConrBaseMapper.getCornerListPopupCount(prConrBaseRequest);
    }

}
