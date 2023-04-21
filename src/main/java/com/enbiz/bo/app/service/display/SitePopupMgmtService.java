package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrSitePopupChlAplyInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrSitePopupInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrSitePopupChlAplyInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrSitePopupInfoResponse;
import com.enbiz.bo.app.entity.PrSitePopupChlAplyInfo;
import com.enbiz.bo.app.entity.PrSitePopupInfo;

/**
 * 팝업 관리 서비스
 */
public interface SitePopupMgmtService {

    /**
     * 팝업 관리 목록 조회
     * @param  prSitePopupInfoRequest
     * @return 팝업 관리 목록
     * @throws Exception
     */
    List<PrSitePopupInfoResponse> getSitePopupList(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception;

    /**
     * 팝업 관리 목록 수 조회
     * @param  prSitePopupInfoRequest
     * @return 팝업 관리 목록 수
     * @throws Exception
     */
    int getSitePopupListCount(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception;

    /**
     * 팝업 관리 삭제 처리
     * @param prSitePopupInfo
     * @throws Exception
     */
    void deleteSitePopupList(PrSitePopupInfo prSitePopupInfo) throws Exception;

    /**
     * 팝업 관리 등록
     * @param popupTgtScrnList
     * @param prSitePopupInfo 등록
     * @throws Exception
     */
    void prSitePopupInfoInsert(List<String> popupTgtScrnList, PrSitePopupInfo prSitePopupInfo) throws Exception;

    /**
     * 팝업 관리 수정
     * @param popupTgtScrnList
     * @param prSitePopupInfo 수정
     * @throws Exception
     */
    void prSitePopupInfoUpdate(List<String> popupTgtScrnList, PrSitePopupInfo prSitePopupInfo) throws Exception;

    /**
     * 팝업 관리 _ 수정 팝업 화면 _ 상세조회 호출
     * @param prSitePopupInfoRequest 수정 팝업 화면 _ 상세조회 호출
     * @throws Exception
     */
    PrSitePopupInfoResponse getSitePopupDetail(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception;

    /**
     * 팝업 관리 채널적용목록 조회
     * @param  prSitePopupInfoRequest
     * @return 팝업 관리 채널적용목록 목록 수
     * @throws Exception
     */
    int getSitePopupChlAplyInfoCount(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception;

    /**
     * 팝업 관리 채널적용목록 조회
     * @param  prSitePopupInfoRequest
     * @return 사이트 팝업 관리 채널적용목록 목록
     * @throws Exception
     */
    List<PrSitePopupChlAplyInfoResponse> getSitePopupChlAplyInfo(PrSitePopupInfoRequest prSitePopupInfoRequest) throws Exception;

    /**
     * 채널적용정보 신규 등록
     * @param prSitePopupChlAplyInfo
     * @throws Exception
     */
    void insertSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo) throws Exception;

    /**
     * 채널적용정보 수정 처리
     * @param prSitePopupChlAplyInfo
     * @throws Exception
     */
    void updateSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo) throws Exception;

    /**
     * 채널적용정보 삭제 처리
     * @param prSitePopupChlAplyInfo
     * @throws Exception
     */
    void deleteSitePopupChlAplyInfo(PrSitePopupChlAplyInfo prSitePopupChlAplyInfo) throws Exception;

    /**
     * 채널적용정보 저장 처리
     * @param gridList
     * @throws Exception
     */
    void prSitePopupChlAplyInfoSave(List<PrSitePopupChlAplyInfoRequest> gridList) throws Exception;

}
