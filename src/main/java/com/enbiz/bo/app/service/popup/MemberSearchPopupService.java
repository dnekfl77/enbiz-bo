package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.MemberSearchRequest;
import com.enbiz.bo.app.dto.response.popup.MemberSearchResponse;

/**
 * 회원 팝업 관리 서비스
 */
public interface MemberSearchPopupService {

    /**
     * 회원 목록 수 조회
     */
    int getMemberListCount(MemberSearchRequest memberSearchRequest) throws Exception;

    /**
     * 회원 목록 조회
     */
    List<MemberSearchResponse> getMemberList(MemberSearchRequest memberSearchRequest) throws Exception;

}
