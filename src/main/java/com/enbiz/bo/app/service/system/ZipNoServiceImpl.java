package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtCudRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtRequest;
import com.enbiz.bo.app.dto.response.system.ZipNoMgmtResponse;
import com.enbiz.bo.app.entity.StBldgAddrInfo;
import com.enbiz.bo.app.entity.StZipNo;
import com.enbiz.bo.app.repository.system.StBldgAddrInfoTrxMapper;
import com.enbiz.bo.app.repository.system.StZipNoMapper;
import com.enbiz.bo.app.repository.system.StZipNoTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 우편번호조회 service
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class ZipNoServiceImpl implements ZipNoService {

    private final StZipNoMapper stZipNoMapper;
    private final StZipNoTrxMapper stZipNoTrxMapper;
    private final StBldgAddrInfoTrxMapper stBldgAddrInfoTrxMapper;

    /**
     * 우편번호 목록 총 건수 조회
     * @param ZipNoMgmtRequest req
     * @return int count
     * @throws Exception
     */
    @Override
    public int getZipNoListCount(ZipNoMgmtRequest req) throws Exception {
        req = getZipNoMgmtRequest(req);
        return stZipNoMapper.getZipNoListTotalCnt(req);
    }

    /**
     * 우편번호 목록 조회
     * @param ZipNoMgmtRequest req
     * @return List<ZipNoMgmtResponse>
     * @throws Exception
     */
    @Override
    public List<ZipNoMgmtResponse> getZipNoList(ZipNoMgmtRequest req) throws Exception {

        req = getZipNoMgmtRequest(req);

        return stZipNoMapper.getZipNoList(req);
    }

    /**
     * 우편번호 목록 조회 파라메터 가져오기.
     * @param req
     * @return
     */
    private ZipNoMgmtRequest getZipNoMgmtRequest(ZipNoMgmtRequest req) {
        if(StringUtils.isNotEmpty(req.getParam1())) {
            String[] params = req.getParam1().split("\\s");
            req.setParam1(params[0]);

            if(params.length > 1) {
                req.setParam2(params[1]);
            }
        }

        return req;
    }
    /**
     * 시도명 목록 조회
     * @return List<String>
     * @throws Exception
     */
    @Override
    public List<String> getCityProvinceNameList() throws Exception {
        return stZipNoMapper.getCtpNmList();
    }

    /**
     * 시군구명 목록 조회
     * @param String ctpNm
     * @return List<String>
     * @throws Exception
     */
    @Override
    public List<String> getSiGunGuNameList(String ctpNm) throws Exception {
        return stZipNoMapper.getSigNmList(ctpNm);
    }

    /**
     * 우편번호 수정, 삭제
     * @param RealGridCUDRequest<ZipNoMgmtCudRequest> cudReq
     * @throws Exception
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveZipNoList(RealGridCUDRequest<ZipNoMgmtCudRequest> cudReq) throws Exception {

        for(ZipNoMgmtCudRequest updateReq : cudReq.getUpdate()) {
            validZipNoPrimary(updateReq);
            validZipNoUpdateData(updateReq);

            StZipNo stZipNo = new StZipNo();
            BeanUtils.copyProperties(updateReq, stZipNo);
            stZipNoTrxMapper.updateStZipNo(stZipNo);

            StBldgAddrInfo stBldgAddrInfo = new StBldgAddrInfo();
            BeanUtils.copyProperties(updateReq, stBldgAddrInfo);
            stBldgAddrInfoTrxMapper.updateBldgAddrInfo(stBldgAddrInfo);
        }

        for(ZipNoMgmtCudRequest deleteReq : cudReq.getDelete()) {
            validZipNoPrimary(deleteReq);

            StZipNo stZipNo = new StZipNo();
            BeanUtils.copyProperties(deleteReq, stZipNo);
            stZipNoTrxMapper.deleteStZipNo(stZipNo);
        }
    }

    private void validZipNoPrimary(ZipNoMgmtCudRequest item) throws Exception {
    	Validator.throwIfEmpty(item.getZipNoSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ZipNoSeq"}));
    }

    private void validZipNoUpdateData(ZipNoMgmtCudRequest updateItem) throws Exception {
    	Validator.throwIfEmpty(updateItem.getZipNoSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"ZipNoSeq"}));

    	Validator.throwIfEmpty(updateItem.getCtpNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"CtpNm"}));
    	
    	Validator.throwIfLongerThan(updateItem.getCtpNm(), 10, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"CtpNm","10"}));
    	
        Validator.throwIfEmpty(updateItem.getSigNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"SigNm"}));
        
        Validator.throwIfLongerThan(updateItem.getSigNm(), 10, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"SigNm","10"}));

        Validator.throwIfEmpty(updateItem.getHemdNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"HemdNm"}));
        
        Validator.throwIfLongerThan(updateItem.getHemdNm(), 10, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"HemdNm","10"}));

        Validator.throwIfEmpty(updateItem.getLnbrMnnm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"LnbrMnnm"}));
        
        Validator.throwIfLongerThan(updateItem.getLnbrMnnm(), 4, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"LnbrMnnm","4"}));

        Validator.throwIfEmpty(updateItem.getLnbrSlno(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"LnbrSlno"}));
        
        Validator.throwIfLongerThan(updateItem.getLnbrSlno(), 4, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"LnbrSlno","4"}));

        Validator.throwIfEmpty(updateItem.getRoadNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"RoadNm"}));
        
        Validator.throwIfLongerThan(updateItem.getRoadNm(), 20, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"RoadNm","20"}));

        Validator.throwIfEmpty(updateItem.getBuldMnnm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"BuldMnnm"}));
        
        Validator.throwIfLongerThan(updateItem.getBuldMnnm(), 20, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"BuldMnnm","20"}));

        Validator.throwIfEmpty(updateItem.getBuldSlno(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"BuldSlno"}));
        
        Validator.throwIfLongerThan(updateItem.getBuldSlno(), 4, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"BuldSlno","4"}));

        Validator.throwIfEmpty(updateItem.getPosBulNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"PosBulNm"}));
        
        Validator.throwIfLongerThan(updateItem.getPosBulNm(), 30, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"PosBulNm","30"}));

        Validator.throwIfEmpty(updateItem.getBuldDtlNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] {"BuldDtlNm"}));
        
        Validator.throwIfLongerThan(updateItem.getBuldDtlNm(), 30, MessageResolver.getMessage("adminCommon.message.parameter.length.exceed", new String[] {"BuldDtlNm","30"}));
        
    }
}