package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CcFotrInfo;

@Repository
@Lazy
public interface CcFotrInfoTrxMapper{

    /**
     * 푸터 관리 - 그룹 목록 등록
     * @param ccFotrInfo
     * @return
     */
    int insertCcFotrInfoGrpList(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 그룹 목록 수정
     * @param ccFotrInfo
     * @return
     */
    int updateCcFotrInfoGrpList(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 그룹 목록 삭제
     * @param ccFotrInfo
     * @return
     */
    int deleteCcFotrInfoGrpList(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 푸터 컨텐츠 저장
     * @param ccFotrInfo
     */
    void updateCcFotrCont(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 메뉴 등록
     * @param ccFotrInfo 등록
     */
	int insertCcFotrInfoMenuList(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 메뉴 수정
     * @param ccFotrInfo 수정
     */
	int updateCcFotrInfoMenuList(CcFotrInfo ccFotrInfo) throws Exception;

    /**
     * 푸터 관리 - 메뉴  삭제
     * @param ccFotrInfo 삭제
     */
	int deleteCcFotrInfoMenuList(CcFotrInfo ccFotrInfo) throws Exception;
}