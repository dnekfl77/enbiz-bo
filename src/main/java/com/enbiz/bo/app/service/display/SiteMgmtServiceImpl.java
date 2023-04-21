package com.enbiz.bo.app.service.display;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.CcSiteBaseRequest;
import com.enbiz.bo.app.dto.response.display.CcSiteBaseResponse;
import com.enbiz.bo.app.entity.CcSiteBase;
import com.enbiz.bo.app.entity.PrDispCtgBase;
import com.enbiz.bo.app.repository.display.CcSiteBaseMapper;
import com.enbiz.bo.app.repository.display.PrDispCtgBaseTrxMapper;
import com.enbiz.bo.app.repository.system.CcSiteBaseTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사이트관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SiteMgmtServiceImpl implements SiteMgmtService {

    private final CcSiteBaseMapper ccSiteBaseMapper;
    private final CcSiteBaseTrxMapper ccSiteBaseTrxMapper;
    private final PrDispCtgBaseTrxMapper prDispCtgBaseTrxMapper;

    @Override
    public List<CcSiteBaseResponse> getSiteNmList() throws Exception {
        return ccSiteBaseMapper.getSiteNmList();
    }

    @Override
    public List<CcSiteBaseResponse> getSiteBaseList(CcSiteBaseRequest ccSiteBaseRequest) throws Exception {
        return ccSiteBaseMapper.getSiteBaseList(ccSiteBaseRequest);
    }

    @Override
    public int getSiteBaseListCount(CcSiteBaseRequest ccSiteBaseRequest) {
        return ccSiteBaseMapper.getSiteBaseListCount(ccSiteBaseRequest);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registCUD(List<CcSiteBase> createList, List<CcSiteBase> updateList) throws Exception{
        insertCcSiteBase(createList);
        updateCcSiteBase(updateList);
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void insertCcSiteBase(List<CcSiteBase> createList) throws Exception {
        for (CcSiteBase ccSiteBase : createList) {
            Validator.throwIfEmpty(ccSiteBase.getSiteNm()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트명"}));
            Validator.throwIfEmpty(ccSiteBase.getSiteDom()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"도메인"}));
            Validator.throwIfEmpty(ccSiteBase.getTrdStrtDt()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"거래시작일자"}));
            Validator.throwIfEmpty(ccSiteBase.getTrdEndDt()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"거래종료일자"}));
            Validator.throwIfLongerThan(ccSiteBase.getSiteNm()  ,300,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"사이트명","300"}));
            Validator.throwIfLongerThan(ccSiteBase.getSiteDom()  ,100,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"도메인","100"}));
            ccSiteBaseTrxMapper.insertSiteBase(ccSiteBase);

            // 사이트 데이터 전시카테고리에 추가
            PrDispCtgBase prDispCtgBase = new PrDispCtgBase();
            Validator.throwIfEmpty(ccSiteBase.getSiteNo()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트번호"}));
            Validator.throwIfEmpty(ccSiteBase.getSiteNm()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트명"}));
            Validator.throwIfEmpty(ccSiteBase.getSysRegId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"등록자ID"}));
            Validator.throwIfEmpty(ccSiteBase.getSysModId()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"수정자ID"}));
            prDispCtgBase.setDispCtgNm(ccSiteBase.getSiteNm()); // 전시카테고리명
            prDispCtgBase.setSiteNo(ccSiteBase.getSiteNo()); // 사이트번호
            prDispCtgBase.setShopTypCd("10"); // 매장유형
            prDispCtgBase.setDispSeq(0); // 전시순서
            prDispCtgBase.setDispYn("Y"); // 전시여부
            prDispCtgBase.setUseYn("Y"); // 사용여부

            String pattern = "yyyyMMdd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String startDate = simpleDateFormat.format(new Date());
            prDispCtgBase.setDispStrDt(startDate); // 전시시작일자
            prDispCtgBase.setDispEndDt("29991231"); // 전시종료일자

            prDispCtgBase.setUprDispCtgNo("1"); // 최상위 루트노드 번호
            prDispCtgBase.setLeafYn("N"); // 최하위여부
            prDispCtgBase.setSysRegId(ccSiteBase.getSysRegId()); // 등록자ID
            prDispCtgBase.setSysModId(ccSiteBase.getSysModId()); // 수정자ID
            prDispCtgBaseTrxMapper.prDispCtgBaseInsert(prDispCtgBase);
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void updateCcSiteBase(List<CcSiteBase> updateList) {
        for (CcSiteBase ccSiteBase : updateList) {
            Validator.throwIfEmpty(ccSiteBase.getSiteNo()        , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트 번호"}));
            Validator.throwIfEmpty(ccSiteBase.getSiteNm()       , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"사이트명"}));
            Validator.throwIfEmpty(ccSiteBase.getSiteDom()      , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"도메인"}));
            Validator.throwIfEmpty(ccSiteBase.getTrdStrtDt()    , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"거래시작일자"}));
            Validator.throwIfEmpty(ccSiteBase.getTrdEndDt()     , MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"거래종료일자"}));
            Validator.throwIfLongerThan(ccSiteBase.getSiteNm()  ,300,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"사이트명","300"}));
            Validator.throwIfLongerThan(ccSiteBase.getSiteDom()  ,100,MessageResolver.getMessage("adminCommon.message.parameter.maxLength.Longer", new String[] {"도메인","100"}));
            ccSiteBaseTrxMapper.updateSiteBase(ccSiteBase);
        }
    }
}
