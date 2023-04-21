package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.customerservice.CsCounselTemplateInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;
import com.enbiz.bo.app.entity.CsCnslTmplInfo;
import com.enbiz.bo.app.repository.customerservice.CsCnslTmplInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCnslTmplInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 상담 템플릿 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class CounselingTemplateMgmtServiceImpl implements CounselingTemplateMgmtService {

    private final CsCnslTmplInfoMapper csCnslTmplInfoMapper;
    private final CsCnslTmplInfoTrxMapper csCnslTmplInfoTrxMapper;

    @Override
    public List<CsCounselTemplateInfoResponse> getCsCounselTemplateInfoList(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
        if(StringUtils.isBlank(CsCounselTemplateInfoRequest.getArgSelectType())){ // 값이 존재하지 않는 경우 -> 상담 템플릿 공통팝업 조회
            return csCnslTmplInfoMapper.getCsCnslTmplInfoPopupList(CsCounselTemplateInfoRequest);
        } else { // 상담 템플릿 관리 조회
            return csCnslTmplInfoMapper.getCsCnslTmplInfoList(CsCounselTemplateInfoRequest);
        }
    }

    @Override
    public int getCsCounselTemplateInfoListCount(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
        return csCnslTmplInfoMapper.getCsCnslTmplInfoListCount(CsCounselTemplateInfoRequest);
    }

    @Override
    public void deleteCsCounselTemplateInfoList(List<CsCnslTmplInfo> deleteList) throws Exception {
        for (CsCnslTmplInfo csCnslTmplInfo : deleteList) {
        	csCnslTmplInfoTrxMapper.deleteCsCnslTmplInfoList(csCnslTmplInfo);
        }
    }

    @Override
    public CsCounselTemplateInfoResponse getCsCounselTemplateInfoDetail(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
        return csCnslTmplInfoMapper.getCsCnslTmplInfoDetail(CsCounselTemplateInfoRequest);
    }

    @Override
    public void registCsCounselTemplateInfo(CsCnslTmplInfo csCnslTmplInfo) throws Exception {
    	csCnslTmplInfoTrxMapper.insertCsCnslTmplInfo(csCnslTmplInfo);
    }

    @Override
    public void updateCsCounselTemplateInfo(CsCnslTmplInfo csCnslTmplInfo) throws Exception {
    	csCnslTmplInfoTrxMapper.updateCsCnslTmplInfo(csCnslTmplInfo);
    }

    @Override
    public int checkDuplacateCsCounselTemplateInfo(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception {
        return csCnslTmplInfoMapper.csCnslTmplInfoDataCheck(CsCounselTemplateInfoRequest);
    }
}
