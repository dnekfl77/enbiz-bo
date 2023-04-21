package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;
import com.enbiz.bo.app.entity.PrTmplBase;
import com.enbiz.bo.app.entity.PrTmplConrMappInfo;

/**
 * 전시 템플릿 관리 서비스
 */
public interface DisplayTemplateMgmtService {

    /**
     * 전시 템플릿 관리 목록 조회
     * @param  prTmplBaseRequest
     * @return 전시 템플릿 관리 목록
     * @throws Exception
     */
    List<PrTmplBaseResponse> getDisplayTemplateList(PrTmplBaseRequest prTmplBaseRequest) throws Exception;

    /**
     * 전시 템플릿 관리 목록 수 조회
     * @param  prTmplBaseRequest
     * @return 전시 템플릿 관리 목록 수
     * @throws Exception
     */
    int getDisplayTemplateListCount(PrTmplBaseRequest prTmplBaseRequest) throws Exception;

    /**
     * 전시 템플릿 관리 신규 처리
     * @param createList 신규 목록
     * @throws Exception
     */
    void createDisplayTemplate(List<PrTmplBase> createList) throws Exception;

    /**
     * 전시 템플릿 관리 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updateDisplayTemplate(List<PrTmplBase> updateList) throws Exception;

    /**
     * 전시 템플릿 관리 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deleteDisplayTemplate(List<PrTmplBase> deleteList) throws Exception;

    /**
     * 전시 템플릿 관리 저장 처리
     * @param createList 추가 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void registCUD(List<PrTmplBase> createList, List<PrTmplBase> updateList, List<PrTmplBase> deleteList) throws Exception;

    /**
     * 템플릿코너매핑정보에 해당 템플릿과 연결된 코너 데이터 여부 확인
     * @param prTmplBaseRequest 데이터 여부 확인
     * @throws Exception
     */
    boolean checkPrTmplConrMappInfo(PrTmplBaseRequest prTmplBaseRequest) throws Exception;

    /**
     * 전시 템플릿 관리 _ 코너 목록 조회
     * @param  prTmplConrMappInfoRequest
     * @return 코너 목록
     * @throws Exception
     */
    List<PrTmplConrMappInfoResponse> getDisplayCornerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest)  throws Exception;

    /**
     * 전시 템플릿 관리 _ 코너 목록 수 조회
     * @param  prTmplConrMappInfoRequest
     * @return 코너 목록 수
     * @throws Exception
     */
    int getDisplayCornerListCount(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest)  throws Exception;

    /**
     * 전시 템플릿 관리 _코너 신규 처리
     * @param createList 신규 목록
     * @throws Exception
     */
    void createDisplayCorner(List<PrTmplConrMappInfo> createList) throws Exception;

    /**
     * 전시 템플릿 관리 _코너 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updateDisplayCorner(List<PrTmplConrMappInfo> updateList) throws Exception;

    /**
     * 전시 템플릿 관리 _코너 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deleteDisplayCorner(List<PrTmplConrMappInfo> deleteList) throws Exception;

    /**
     * 전시 템플릿 관리 _코너 저장 처리
     * @param createList 추가 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void cornerRegistCUD(List<PrTmplConrMappInfo> createList, List<PrTmplConrMappInfo> updateList, List<PrTmplConrMappInfo> deleteList) throws Exception;

    /**
     * 코너 삭제시 전시코너정보에 해당 코너 데이터 여부 확인
     * @param prTmplConrMappInfoRequest 데이터 여부 확인
     * @throws Exception
     */
    boolean checkPrDispConrInfo(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception;

}
