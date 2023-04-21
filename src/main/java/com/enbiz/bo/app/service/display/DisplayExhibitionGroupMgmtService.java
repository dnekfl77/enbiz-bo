package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrDispGrpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGrpMappInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrDispGrpBaseRespons;
import com.enbiz.bo.app.dto.response.display.PrDispGrpMappInfoRespons;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;

/**
 * 기획전 관리 Service
 */
public interface DisplayExhibitionGroupMgmtService {

    /**
     * 그룹  수 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록 수
     * @throws Exception
     */
    int getPrDispGrpBaseListCount(PrDispGrpBaseRequest prDispGrpMappInfoRequest) throws Exception;

    /**
     * 그룹 목록 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록
     * @throws Exception
     */
    List<PrDispGrpBaseRespons> getPrDispGrpBaseList(PrDispGrpBaseRequest prDispGrpBaseRequest) throws Exception;

    /**
     * 그룹  등록, 수정, 삭제
     * @param ccCcFotrInfoInfo 등록
     * @throws Exception
     */
    void savePrDispGrpBaseList(List<PrDispGrpBaseRequest> insertList, List<PrDispGrpBaseRequest> updateList, List<PrDispGrpBaseRequest> deleteList) throws Exception;


    /**
     * 기획전 목록 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록
     * @throws Exception
     */
    List<PrDispGrpMappInfoRespons> getPrDispGrpMappInfoList(PrDispGrpMappInfoRequest prDispGrpMappInfoRequest) throws Exception;

    /**
     * 기획전 목록 수 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록 수
     * @throws Exception
     */
    int getPrDispGrpMappInfoListCount(PrDispGrpMappInfoRequest prDispGrpMappInfoRequest) throws Exception;

    /**
     * 기획전 목록  등록, 수정, 삭제
     * @param ccCcFotrInfoInfo 등록
     * @throws Exception
     */
    void savePrDispGrpMappInfoList(List<PrDispGrpMappInfoRequest> insertList, List<PrDispGrpMappInfoRequest> updateList, List<PrDispGrpMappInfoRequest> deleteList) throws Exception;

    /**
     * 기획전 수 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록 수
     * @throws Exception
     */
    int getMarketDisplayListCount(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기획전 조회
     * @param  ccCcFotrInfoInfoRequest
     * @return 기획전 관리 목록
     * @throws Exception
     */
    List<PrMkdpBaseResponse> getMarketDisplayList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;
}
