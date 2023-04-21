package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsCounselTemplateInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;

@Repository
@Lazy
public interface CsCnslTmplInfoMapper {

    /**
     * 상담 템플릿 공통팝업 목록 조회
     * @param CsCounselTemplateInfoRequest
     * @return
     */
    List<CsCounselTemplateInfoResponse> getCsCnslTmplInfoPopupList(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest);

    /**
     * 상담 템플릿 관리 목록 조회
     * @param CsCounselTemplateInfoRequest
     * @return
     */
    List<CsCounselTemplateInfoResponse> getCsCnslTmplInfoList(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest);

    /**
     * 상담 템플릿 관리 목록 조회
     * @param CsCounselTemplateInfoRequest
     * @return
     */
    int getCsCnslTmplInfoListCount(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest);

    /**
     * 상담 템플릿 관리 > 템플릿 상세조회
     * @param CsCounselTemplateInfoRequest
     * @return
     */
    CsCounselTemplateInfoResponse getCsCnslTmplInfoDetail(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest);

    /**
     * 상담 템플릿 관리 > 템플릿 저장 (데이터 중복 체크)
     * @param CsCounselTemplateInfoRequest
     * @return
     */
    int csCnslTmplInfoDataCheck(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest);

    /**
     * 상담 템플릿 selecbox 조회
     * @param CsCounselTemplateInfoRequest
     * @return
     */
    List<CsCounselTemplateInfoResponse> getCsCnslTmplInfoSelectBoxList(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest);

}
