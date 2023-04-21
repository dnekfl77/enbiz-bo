package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.CsCounselTemplateInfoRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsCounselTemplateInfoResponse;
import com.enbiz.bo.app.entity.CsCnslTmplInfo;

/**
 * 상담템플릿관리 Service
 */
public interface CounselingTemplateMgmtService {

    /**
     * 상담 템플릿 관리 목록 조회
     * @param CsCounselTemplateInfoRequest
     * @return
     * @throws Exception
     */
    List<CsCounselTemplateInfoResponse> getCsCounselTemplateInfoList(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception;

    /**
     *  상담 템플릿 관리 목록 조회 수
     * @param CsCounselTemplateInfoRequest
     * @throws Exception
     */
    int getCsCounselTemplateInfoListCount(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception;

    /**
     * 상담 템플릿 리스트 삭제
     *
     * @param deleteList
     * @throws Exception
     */
    void deleteCsCounselTemplateInfoList(List<CsCnslTmplInfo> deleteList) throws Exception;

    /**
     * 상담 템플릿 관리 > 템플릿 상세조회
     *
     * @param CsCounselTemplateInfoRequest
     * @throws Exception
     */
    CsCounselTemplateInfoResponse getCsCounselTemplateInfoDetail(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception;

    /**
     * 상담 템플릿 관리 > 템플릿 등록
     *
     * @param csCnslTmplInfo
     * @throws Exception
     */
    void registCsCounselTemplateInfo(CsCnslTmplInfo csCnslTmplInfo) throws Exception;

    /**
     * 상담 템플릿 관리 > 템플릿 수정
     *
     * @param csCnslTmplInfo
     * @throws Exception
     */
    void updateCsCounselTemplateInfo(CsCnslTmplInfo csCnslTmplInfo) throws Exception;

    /**
     * 상담 템플릿 관리 > 템플릿 저장 (데이터 중복 체크)
     *
     * @param CsCounselTemplateInfoRequest
     * @throws Exception
     */
    int checkDuplacateCsCounselTemplateInfo(CsCounselTemplateInfoRequest CsCounselTemplateInfoRequest) throws Exception;

}
