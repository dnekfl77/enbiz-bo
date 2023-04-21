package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.CcFotrInfoRequest;
import com.enbiz.bo.app.dto.response.display.CcFotrInfoResponse;
import com.enbiz.bo.app.entity.CcFotrInfo;

/**
 * 푸터 관리 서비스
 */
public interface FooterMgmtService {

    /**
     * 푸터 관리 - 그룹 목록 조회
     * @param  ccFotrInfoRequest
     * @return 푸터 관리 목록
     * @throws Exception
     */
    List<CcFotrInfoResponse> getCcFotrInfoGrpList(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

    /**
     * 푸터 관리 - 그룹 목록 수 조회
     * @param  ccFotrInfoRequest
     * @return 푸터 관리 목록 수
     * @throws Exception
     */
    int getCcFotrInfoGrpListCount(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

    /**
     * 푸터 관리  - 그룹 목록 등록, 수정, 삭제
     * @param insertList
     * @param updateList
     * @param deleteList
     * @throws Exception
     */
    void saveCcFotrInfoGroup(List<CcFotrInfo> insertList, List<CcFotrInfo> updateList, List<CcFotrInfo> deleteList) throws Exception;

    /**
     * 푸터 관리 - 푸터 컨텐츠 조회
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    CcFotrInfoResponse getFooterMgmtCont(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;
    
    /**
     * 푸터 관리 - 푸터 컨텐츠 저장
     * @param ccFotrInfo
     * @throws Exception
     */
    void updateCcFotrCont(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 메뉴 목록 조회
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    List<CcFotrInfoResponse> getCcFotrInfoMenuList(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

    /**
     * 푸터 관리 - 메뉴 목록 수 조회
     * @param ccFotrInfoRequest
     * @return
     * @throws Exception
     */
    int getCcFotrInfoMenuListCount(CcFotrInfoRequest ccFotrInfoRequest) throws Exception;

    /**
     * 푸터관리 - 메뉴 저장
     * @param insertList
     * @param updateList
     * @param deleteList
     * @throws Exception
     */
    void saveCcFotrInfoMenu(List<CcFotrInfo> insertList, List<CcFotrInfo> updateList, List<CcFotrInfo> deleteList) throws Exception;
}
