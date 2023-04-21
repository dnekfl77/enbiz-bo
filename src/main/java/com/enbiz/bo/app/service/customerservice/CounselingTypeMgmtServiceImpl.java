package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.ConsultTypeCuRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypePopupRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CounselingTypeResponse;
import com.enbiz.bo.app.entity.CsCnslTypInfo;
import com.enbiz.bo.app.enums.common.CommonCode;
import com.enbiz.bo.app.repository.customerservice.CsCnslTypInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCnslTypInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CounselingTypeMgmtServiceImpl implements CounselingTypeMgmtService{

    private final CsCnslTypInfoMapper csCnslTypInfoMapper;
    private final CsCnslTypInfoTrxMapper csCnslTypInfoTrxMapper;

    @Override
    public List<CounselingTypeResponse> getCounselingTypeList(String useYn) throws Exception {
        CounselingTypeRequest CounselingTypeRequest = new CounselingTypeRequest();
        CounselingTypeRequest.setUseYn(useYn);
        CounselingTypeRequest.setRootCnslTypNo(CommonCode.CS_CNSL_TYP_ROOT.getCd());
        return csCnslTypInfoMapper.getConsultationTypeList(CounselingTypeRequest);
    }

    @Override
    public List<CounselingTypeResponse> getLowerCounselingTypeList(CounselingTypeRequest CounselingTypeRequest) throws Exception {
        return csCnslTypInfoMapper.getLowerConsultationTypeList(CounselingTypeRequest);
    }

    @Override
    public int getLowerCounselingTypeListCount(CounselingTypeRequest CounselingTypeRequest) throws Exception {
        return csCnslTypInfoMapper.getLowerConsultationTypeListCount(CounselingTypeRequest);
    }

    @Override
    public void saveCounselingType(List<ConsultTypeCuRequest> createList, List<ConsultTypeCuRequest> updateList) throws Exception {
        for(ConsultTypeCuRequest consultTypeCuRequest : createList){
            CsCnslTypInfo csCnslTypInfo = new CsCnslTypInfo();
            BeanUtils.copyProperties(csCnslTypInfo, consultTypeCuRequest);

            String cnslTypNo = csCnslTypInfoMapper.getConsultationTypeNo();
            Integer level = consultTypeCuRequest.getLevel();

            csCnslTypInfo.setCnslTypNo(cnslTypNo);

            if(level == 1){
                csCnslTypInfo.setCnslLrgTypNo(cnslTypNo);
                csCnslTypInfo.setCnslMidTypNo(null);
                csCnslTypInfo.setCnslSmlTypNo(null);
            }else if(level == 2){
                csCnslTypInfo.setCnslMidTypNo(cnslTypNo);
                csCnslTypInfo.setCnslSmlTypNo(null);
            }else{
                csCnslTypInfo.setCnslSmlTypNo(cnslTypNo);
            }

            csCnslTypInfo.setRespBaseMemo(consultTypeCuRequest.getRespBaseMemoData());

            csCnslTypInfoTrxMapper.insertConsultationType(csCnslTypInfo);
        }

        for(ConsultTypeCuRequest consultTypeCuRequest : updateList){
            CsCnslTypInfo csCnslTypInfo = new CsCnslTypInfo();
            BeanUtils.copyProperties(csCnslTypInfo, consultTypeCuRequest);
            csCnslTypInfo.setRespBaseMemo(consultTypeCuRequest.getRespBaseMemoData());
            csCnslTypInfoTrxMapper.updateConsultationType(csCnslTypInfo);
        }
    }

    @Override
    public List<CounselingTypeResponse> getCounselingTypeNoList(String cnslTypNo) throws Exception {
        return csCnslTypInfoMapper.getCnslTypNoList(cnslTypNo);
    }

    @Override
    public List<CounselingTypeResponse> getCounselingTypeListPopup(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception {
        return csCnslTypInfoMapper.getConsultationTypeListPopup(CounselingTypePopupRequest);
    }

    @Override
    public int getCounselingTypeListPopupCount(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception {
        return csCnslTypInfoMapper.getConsultationTypeListPopupCount(CounselingTypePopupRequest);
    }
}
