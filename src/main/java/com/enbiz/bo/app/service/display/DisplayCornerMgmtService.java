package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.entity.PrConrBase;
import com.enbiz.bo.app.entity.PrConrTgtInfo;
import com.enbiz.bo.app.entity.PrTmplConrMappInfo;

/**
 * 전시 코너 관리 서비스
 */
public interface DisplayCornerMgmtService {

    /**
     * 전시 코너 관리 목록 조회
     * @param  prConrBaseRequest
     * @return 전시 코너 관리 목록
     * @throws Exception
     */
    List<PrConrBaseResponse> getDisplayCornerList(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 관리 목록 수 조회
     * @param  prConrBaseRequest
     * @return 전시 코너 관리 목록 수
     * @throws Exception
     */
    int getDisplayCornerListCount(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 관리 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updateDisplayCornerBase(List<PrConrBase> updateList) throws Exception;

    /**
     * 전시 코너 관리 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deleteDisplayCornerBase(List<PrConrBase> deleteList) throws Exception;

    /**
     * 전시 코너 관리 저장 처리
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void registCUD(List<PrConrBase> updateList, List<PrConrBase> deleteList) throws Exception;

    /**
     * 전시 코너 관리 _ 템플릿 목록 조회
     * @param  prConrBaseRequest
     * @return 해당 코너에 등록된 템플릿 목록
     * @throws Exception
     */
    List<PrTmplBaseResponse> getTmplConrMappInfo(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 관리 _ 템플릿 목록 수 조회
     * @param  prConrBaseRequest
     * @return 해당 코너에 등록된 템플릿 목록 수
     * @throws Exception
     */
    int getTmplConrMappInfoCount(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 상세조회
     * @param  prConrBaseRequest
     * @return 전시 코너 상세조회
     * @throws Exception
     */
    PrConrBaseResponse getDisplayCornerDetail(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 상세조회 _ 코너대상정보 조회
    * @param  prConrBaseRequest
     * @return 코너대상정보 조회
     * @throws Exception
     */
    List<PrConrTgtInfoResponse> getCornerTargetInfoList(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 등록
     * @param prConrBase
     * @param conrTgt
     * @throws Exception
     */
    void prConrBaseInsert(PrConrBase prConrBase, List<PrConrTgtInfoRequest> conrTgt) throws Exception;

    /**
     * 전시 코너 수정
     * @param prConrBase
     * @param conrTgt
     * @param removeConrTgt
     * @throws Exception
     */
    void prConrBaseUpdate(PrConrBase prConrBase, List<PrConrTgtInfoRequest> conrTgt, String removeConrTgt) throws Exception;

    /**
     * 템플릿코너매핑정보 신규, 수정, 삭제목록
     * @param gridList
     * @throws Exception
     */
    void prTmplConrMappInfoSave(List<PrTmplConrMappInfoRequest> gridList) throws Exception;

    /**
     * 템플릿코너매핑정보 신규 등록
     * @param prTmplConrMappInfo 신규 목록
     * @throws Exception
     */
    void insertPrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo) throws Exception;

    /**
     * 템플릿코너매핑정보 수정 처리
     * @param prTmplConrMappInfo 수정 목록
     * @throws Exception
     */
    void updatePrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo) throws Exception;

    /**
     * 템플릿코너매핑정보 삭제 처리
     * @param prTmplConrMappInfo 삭제 목록
     * @throws Exception
     */
    void deletePrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo) throws Exception;

    /**
     * 전시세트정보에 데이터 여부 확인
     * @param prConrTgtInfo
     * @throws Exception
     */
    boolean checkPrConrSetInfo(PrConrTgtInfo prConrTgtInfo) throws Exception;

    /**
     * 전시코너정보에 코너 데이터 여부 확인
     * @param prConrBase
     * @throws Exception
     */
    boolean checkPrDispConrInfo(PrConrBase prConrBase) throws Exception;

    /**
     * 템플릿코너매핑정보에 해당 코너와 연결된 템플릿 데이터 여부 확인
     * @param prConrBase
     * @throws Exception
     */
    boolean checkPrTmplConrMappInfo(PrConrBase prConrBase) throws Exception;

    /**
     * 전시 코너 조회 팝업 조회
     * @param prConrBaseRequest
     * @throws Exception
     */
    List<PrConrBaseResponse> getCornerListPopup(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 코너 조회 팝업 조회 목록 수
     * @param prConrBaseRequest
     * @throws Exception
     */
    int getCornerListPopupCount(PrConrBaseRequest prConrBaseRequest) throws Exception;
}
