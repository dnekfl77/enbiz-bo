package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.popup.StRtTgtMenuRequest;
import com.enbiz.bo.app.dto.request.system.RightTargetBaseMenuRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.popup.StRtTgtMenuResponse;
import com.enbiz.bo.app.dto.response.system.RightTargetBaseMenuResponse;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StRtTgtBase;

/**
 * 권한대상 관리
 * munu , 화면 , Request , 버튼
 */
@Repository
@Lazy
public interface StRtTgtBaseMapper {

    /**
     * 페이지 권한 체크
     */
    int getAdminGroupList(LoginRequest loginRequest) throws Exception;

    /**
     * 접속한  Url의 RtTgtSeq조회 및 개인정보 유무 조회
     */
    StRtTgtBase getRtTgtSeqByStRtTgtBase(StRtTgtBase stRtTgtBase) throws Exception;

    /**
     * 메뉴 조회 팝업 Mappper
     */
    List<StRtTgtMenuResponse> getMenuList(StRtTgtMenuRequest stRtTgtMenuRequest);

    /**
     * 메뉴 트리 리스트 조회
     */
    List<RtTargetBaseResponse> getMenuMgmtTreeList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 메뉴 조회
     */
    RtTargetBaseResponse getMenuInfo(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 count 조회
     */
    int getSubMenuListCount(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 조회
     */
    List<RtTargetBaseResponse> getSubMenuList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 count 조회
     */
    int getSubMenuCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 count 조회
     */
    int getStRtInfoCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

}