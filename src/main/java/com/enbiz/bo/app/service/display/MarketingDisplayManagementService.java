package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrMkdpGoodsInfoRequest;
import com.enbiz.bo.app.dto.response.PrMkdpGoodsInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrDispImgInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpDivobjInfoResponse;
import com.enbiz.bo.app.entity.PrMkdpBase;
import com.enbiz.bo.app.entity.PrMkdpDivobjInfo;
import com.enbiz.bo.app.entity.PrMkdpGoodsInfo;

/**
 * 기획전 관리 서비스
 */
public interface MarketingDisplayManagementService {

    /**
     * 기확전 관리 _ 기획전 목록 조회
     * @param  prMkdpBaseRequest
     * @return 기획전 목록 조회
     * @throws Exception
     */
    List<PrMkdpBaseResponse> getPrMkdpBaseList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기확전 관리 _ 기획전 목록 수 조회
     * @param  prMkdpBaseRequest
     * @return 기획전 목록 수 조회
     * @throws Exception
     */
    int getPrMkdpBaseListCount(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기획전 관리 > 기획전 등록 팝업 기본정보 탭 저장
     *
     * @param prMkdpBaseRequest
     * @throws Exception
     */
    void savePrMkdpBase(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기획전 관리 > 그리드 저장
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void registCUDPrMkdpBase(List<PrMkdpBase> updateList, List<PrMkdpBase> deleteList) throws Exception;

    /**
     * 기획전 관리 > 그리드 저장 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updatePrMkdpBaseList(List<PrMkdpBase> updateList) throws Exception;

    /**
     * 기획전 관리 > 그리드 저장 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deletePrMkdpBaseList(List<PrMkdpBase> deleteList) throws Exception;

    /**
     * 기획전 관리 > 기획전 상세 조회
     * @param prMkdpBaseRequest
     * @throws Exception
     */
    PrMkdpBaseResponse getPrMkdpBaseDetail(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기획전 관리 > 기획전 이미지 상세 조회
     * @param prMkdpBaseRequest
     * @throws Exception
     */
    List<PrDispImgInfoResponse> getPrDispImgInfoDetail(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기확전 관리 _ 구분자 정보 목록 조회
     * @param  prMkdpBaseRequest
     * @return 구분자 정보 목록 조회
     * @throws Exception
     */
    List<PrMkdpDivobjInfoResponse> getPrMkdpDivObjInfoList(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기확전 관리 _ 구분자 정보 목록 수 조회
     * @param  prMkdpBaseRequest
     * @return 구분자 정보 목록 수 조회
     * @throws Exception
     */
    int getPrMkdpDivObjInfoListCount(PrMkdpBaseRequest prMkdpBaseRequest) throws Exception;

    /**
     * 기확전 관리 _ 구분자 정보 그리드 _ 템플릿 리스트
     * @return
     * @throws Exception
     */
    List<PrMkdpDivobjInfoResponse> getPrTmplBase() throws Exception;

    /**
     * 구분자 정보 그리드 저장
     * @param createList 입력 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void registCUDPrMkdpDivobjInfo(List<PrMkdpDivobjInfo> createList, List<PrMkdpDivobjInfo> updateList, List<PrMkdpDivobjInfo> deleteList) throws Exception;

    /**
     * 구분자 정보 그리드 저장 입력 처리
     * @param createList 입력 목록
     * @throws Exception
     */
    void insertPrMkdpDivobjInfo(List<PrMkdpDivobjInfo> createList) throws Exception;

    /**
     * 구분자 정보 그리드 저장 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updatePrMkdpDivobjInfo(List<PrMkdpDivobjInfo> updateList) throws Exception;

    /**
     * 구분자 정보 그리드 저장 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deletePrMkdpDivobjInfo(List<PrMkdpDivobjInfo> deleteList) throws Exception;

    /**
     * 기확전 관리 _ 기획전 상품 정보 목록 조회
     * @param  prMkdpGoodsInfoRequest
     * @return 구분자 정보 목록 조회
     * @throws Exception
     */
    List<PrMkdpGoodsInfoResponse> getPrMkdpGoodsInfoList(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception;

    /**
     * 기확전 관리 _ 기획전 상품 정보 목록 수 조회
     * @param  prMkdpGoodsInfoRequest
     * @return 구분자 정보 목록 수 조회
     * @throws Exception
     */
    int getPrMkdpGoodsInfoListCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception;

    /**
     * 기획전 상품 정보 그리드 저장
     * @param createList 입력 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void registCUDPrMkdpGoodsInfo(List<PrMkdpGoodsInfo> createList, List<PrMkdpGoodsInfo> updateList, List<PrMkdpGoodsInfo> deleteList) throws Exception;

    /**
     * 기획전 상품 정보 그리드 저장 입력 처리
     * @param createList 입력 목록
     * @throws Exception
     */
    void insertPrMkdpGoodsInfoList(List<PrMkdpGoodsInfo> createList) throws Exception;

    /**
     * 기획전 상품 정보 그리드 저장 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updatePrMkdpGoodsInfoList(List<PrMkdpGoodsInfo> updateList) throws Exception;

    /**
     * 기획전 상품 정보 그리드 저장 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deletePrMkdpGoodsInfoList(List<PrMkdpGoodsInfo> deleteList) throws Exception;

    /**
     * 기획전 상품 _ 품절 상품 목록 수
     * @param  prMkdpGoodsInfoRequest
     * @return 기획전 상품 _ 품절 상품 목록 수
     * @throws Exception
     */
    int getSoldOutCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest) throws Exception;

}
