package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.ConsultTypeCuRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypePopupRequest;
import com.enbiz.bo.app.dto.request.customerservice.CounselingTypeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CounselingTypeResponse;

/**
 * 상담유형관리 Service
 */
public interface CounselingTypeMgmtService {

    /**
     * 상담유형관리 LIST (tree)
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getCounselingTypeList(String useYn) throws Exception;

    /**
     * 상담유형관리 1dept 하위 목록 조회
     * @param CounselingTypeRequest
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getLowerCounselingTypeList(CounselingTypeRequest CounselingTypeRequest) throws Exception;

    /**
     *  상담유형관리 1dept 하위 목록 조회수
     * @param CounselingTypeRequest
     * @throws Exception
     */
    int getLowerCounselingTypeListCount(CounselingTypeRequest CounselingTypeRequest) throws Exception;

    /**
     * 상담유형관리 등록 및 업데이트
     *
     * @param request
     * @throws Exception
     */
    void saveCounselingType(List<ConsultTypeCuRequest> createList, List<ConsultTypeCuRequest> updateList) throws Exception;

    /**
     * 상담유형관리 대유형 , 중유형 , 소유형 조회
     * @param cnslTypNo
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getCounselingTypeNoList(String cnslTypNo) throws Exception;

    /**
     * 상담유형조회
     * @param CounselingTypePopupRequest
     * @return
     * @throws Exception
     */
    List<CounselingTypeResponse> getCounselingTypeListPopup(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception;

    /**
     * 상담유형조회 수
     * @param CounselingTypePopupRequest
     * @return
     * @throws Exception
     */
    int getCounselingTypeListPopupCount(CounselingTypePopupRequest CounselingTypePopupRequest) throws Exception;
}
