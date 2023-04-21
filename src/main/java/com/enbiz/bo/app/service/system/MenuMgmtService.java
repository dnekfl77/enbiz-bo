package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.RtTargetBaseCudRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StRtTgtBase;

public interface MenuMgmtService {

    /**
     * 메뉴 트리 리스트 조회
     * @param  RtTargetBaseRequest
     * @return List<RtTargetBaseResponse>
     * @throws Exception
     */
    List<RtTargetBaseResponse> getMenuMgmtTreeList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 메뉴 조회
     * @param  RtTargetBaseRequest
     * @return List<RtTargetBaseResponse>
     * @throws Exception
     */
    RtTargetBaseResponse getMenuInfo(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 count 조회
     * @param  RtTargetBaseRequest
     * @return int
     * @throws Exception
     */
    int getSubMenuListCount(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 조회
     * @param  RtTargetBaseRequest
     * @return List<StRtTgtBase>
     * @throws Exception
     */
    List<RtTargetBaseResponse> getSubMenuList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 메뉴 관리 대메뉴 저장
     * @param  RtTargetBaseCudRequest
     * @return void
     * @throws Exception
     */
    void registMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception;

    /**
     * 메뉴 관리 대메뉴 수정
     * @param  RtTargetBaseCudRequest
     * @return void
     * @throws Exception
     */
    void modifyMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception;

    /**
     * 하위 메뉴 리스트 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    void registSubMenu(List<StRtTgtBase> createList) throws Exception;

    /**
     * 하위 메뉴 리스트 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void modifySubMenu(List<StRtTgtBase> updateList) throws Exception;

    /**
     * 하위 메뉴 리스트 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deleteSubMenu(List<StRtTgtBase> deleteList) throws Exception;

    /**
     * 하위 메뉴 리스트 저장 처리
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void saveSubMenu(List<StRtTgtBase> createList, List<StRtTgtBase> updateList, List<StRtTgtBase> deleteList) throws Exception;

    /**
     * 하위메뉴 여부 확인
     * @param RtTargetBaseRequest
     * @throws Exception
     */
    int getSubMenuCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;

    /**
     * 하위메뉴 여부 확인
     * @param RtTargetBaseRequest
     * @throws Exception
     */
    int getRtInfoCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception;
}
