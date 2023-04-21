package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.BadWordMgmtRequest;
import com.enbiz.bo.app.dto.response.system.BadWordMgmtResponse;
import com.enbiz.bo.app.entity.StBwInfo;

/**
 * 금칙어 관리 서비스
 */
public interface BadWordMgmtService {

    /**
     * 금칙어 목록 조회
     * @param  stBwInfo
     * @return 금칙어 목록
     * @throws Exception
     */
    List<BadWordMgmtResponse> getBadWordList(BadWordMgmtRequest badWordMgmtRequest) throws Exception;

    /**
     * 금칙어 목록 수 조회
     * @param  stBwInfo
     * @return 금칙어 목록 수
     * @throws Exception
     */
    int getBadWordListCount(BadWordMgmtRequest badWordMgmtRequest) throws Exception;

    /**
     * 금칙어 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    void registBadWord(List<StBwInfo> createList) throws Exception;

    /**
     * 금칙어 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void modifyBadWord(List<StBwInfo> updateList) throws Exception;

    /**
     * 금칙어 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deleteBadWord(List<StBwInfo> deleteList) throws Exception;

    /**
     * 금칙어 저장 처리
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void saveBadWord(List<StBwInfo> createList, List<StBwInfo> updateList, List<StBwInfo> deleteList) throws Exception;


}
