package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrContInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrSetInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrTmplConrMappInfoRequest;
import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrContInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrConrSetInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplConrMappInfoResponse;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;
import com.enbiz.bo.app.entity.PrConrContInfo;
import com.enbiz.bo.app.entity.PrConrSetInfo;

/**
 * 전시 연결 관리 서비스
 */
public interface DisplayConnectMgmtService {

    /**
     * 전시 연결 관리 _ 코너 목록 조회
     * @param  prTmplConrMappInfoRequest
     * @return 코너 목록 조회
     * @throws Exception
     */
    List<PrTmplConrMappInfoResponse> getConnerList(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 목록 수 조회
     * @param  prTmplConrMappInfoRequest
     * @return 코너 목록 수 조회
     * @throws Exception
     */
    int getConnerListCount(PrTmplConrMappInfoRequest prTmplConrMappInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 연결 관리 팝업 화면 호출
     * @param prConrBaseRequest 전시 연결 관리 팝업 화면 호출
     * @throws Exception
     */
    PrConrBaseResponse getConnerDetail(PrConrBaseRequest prConrBaseRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 연결 관리 팝업 화면 호출 _ 카테고리 경로
     * @param prDispCtgBaseRequest 전시 연결 관리 팝업 화면 호출 _ 카테고리 경로
     * @throws Exception
     */
    PrDispCtgBaseResponse getDispHierarchyNm(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 대상 세트 목록 조회
     * @param  prConrSetInfoRequest
     * @return 전시 대상 세트 목록 조회
     * @throws Exception
     */
    List<PrConrSetInfoResponse> getSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 대상 세트 목록 조회 _ 코너대상정보에서 조회
     * @param  prConrSetInfoRequest
     * @return 전시 대상 세트 목록 조회
     * @throws Exception
     */
    List<PrConrSetInfoResponse> getFirstSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 대상 세트 목록 수 조회
     * @param  prConrSetInfoRequest
     * @return 전시 대상 세트 목록 수 조회
     * @throws Exception
     */
    int getSetConnerListCount(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 코너 정보 저장
     * @param  prConrSetInfoRequest
     * @return 전시 코너 정보 저장
     * @throws Exception
     */
    void prDispConrInfoInsert(PrConrSetInfoRequest prConrSetInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 전시 세트 정보 저장
     * @param  prConrSetInfoRequest
     * @return 전시 세트 정보 저장
     * @throws Exception
     */
    void prConrSetInfoInsert(String dispCtgNo, PrConrSetInfoRequest prConrSetInfoRequest) throws Exception;

    /**
     * 전시 세트 정보 저장 _ 세트인 경우 (그리드)
     * @param updateList 신규, 수정 목록
     * @throws Exception
     */
    void registCUD(List<PrConrSetInfo> updateList) throws Exception;

    /**
     * 전시 연결 관리 팝업 _ 탭 리스트 조회
     * @param  prConrTgtInfoRequest
     * @return 탭 리스트 조회
     * @throws Exception
     */
    List<PrConrTgtInfoResponse> getConrTgtCdList(PrConrTgtInfoRequest prConrTgtInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (상품)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (상품)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoGoodsList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (상품)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (상품)
     * @throws Exception
     */
    int getPrConrContInfoListGoodsCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (상품리뷰)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (상품리뷰)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoReviewList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (상품리뷰)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (상품리뷰)
     * @throws Exception
     */
    int getPrConrContInfoReviewListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 코너 컨텐츠 정보 저장
     * @param createList
     * @param updateList
     * @param deleteList
     * @throws Exception
     */
    void registCUDPrConrContInfo(List<PrConrContInfo> createList, List<PrConrContInfo> updateList, List<PrConrContInfo> deleteList) throws Exception;

    /**
     * 코너 컨텐츠 정보 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    void insertPrConrContInfoMapperInfo(List<PrConrContInfo> createList) throws Exception;

    /**
     * 코너 컨텐츠 정보 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void updatePrConrContInfoMapperInfo(List<PrConrContInfo> updateList) throws Exception;

    /**
     * 코너 컨텐츠 정보 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deletePrConrContInfoMapperInfo(List<PrConrContInfo> deleteList) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (브랜드)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (브랜드)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoBrandList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (브랜드)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (브랜드)
     * @throws Exception
     */
    int getPrConrContInfoListBrandCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결관리 팝업 _ 브랜드 탭 _ 브랜드 상세조회
     * @param prBrandMstRequest
     * @throws Exception
     */
    PrBrandMstResponse getBrandDetail(PrBrandMstRequest prBrandMstRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (기획전)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (기획전)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoMkdpList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (기획전)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (기획전)
     * @throws Exception
     */
    int getPrConrContInfoMkdpListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (HTML)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (HTML)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoHtmlList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (HTML)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (HTML)
     * @throws Exception
     */
    int getPrConrContInfoHtmlListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결관리 팝업 _ HTML 탭 _ HTML 전시 상세조회
     * @param prConrContInfoRequest
     * @throws Exception
     */
    PrConrContInfoResponse getPrConrContInfoHtmlDetail(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 > 탭 _ HTML&이미지 등록
     * @param  prConrContInfo
     * @return
     * @throws Exception
     */
    void prConrContInfoInsert(PrConrContInfo prConrContInfo) throws Exception;

    /**
     * 전시 연결 관리 > 탭 _ HTML&이미지 수정
     * @param  prConrContInfo
     * @return
     * @throws Exception
     */
    void prConrContInfoUpdate(PrConrContInfo prConrContInfo) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (이미지 배너)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (이미지 배너)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoImgList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (이미지 배너)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (이미지 배너)
     * @throws Exception
     */
    int getPrConrContInfoImgListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결관리 팝업 _ 이미지 배너 탭 _ 이미지 배너 전시 상세조회
     * @param prConrContInfoRequest
     * @throws Exception
     */
    PrConrContInfoResponse getPrConrContInfoImgDetail(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 조회 (Text 배너)
     * @param  prConrContInfoRequest
     * @return 전시 대상 세트 목록 조회 (Text 배너)
     * @throws Exception
     */
    List<PrConrContInfoResponse> getPrConrContInfoTextList(PrConrContInfoRequest prConrContInfoRequest) throws Exception;

    /**
     * 전시 연결 관리 _ 코너 컨텐츠 정보 목록 수 조회 (Text 배너)
     * @param  prConrContInfoRequest
     * @return 코너 컨텐츠 정보 목록 수 조회 (Text 배너)
     * @throws Exception
     */
    int getPrConrContInfoTextListCount(PrConrContInfoRequest prConrContInfoRequest) throws Exception;
}
