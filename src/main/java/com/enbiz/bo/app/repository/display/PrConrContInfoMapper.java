package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrConrContInfoRequest;
import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.display.PrConrContInfoResponse;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;
import com.enbiz.bo.app.entity.PrConrContInfo;

@Repository
@Lazy
public interface PrConrContInfoMapper {

    /**
     * 전시 대상 세트 목록 조회 (상품)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoGoodsList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (상품)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoListGoodsCount(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 대상 세트 목록 조회 (상품리뷰)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoReviewList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (상품리뷰)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoReviewListCount(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 신규 등록
     */
    void insertPrConrContInfo(PrConrContInfo prConrContInfo);

    /**
     * 코너 컨텐츠 정보 수정 처리
     */
    void updatePrConrContInfo(PrConrContInfo prConrContInfo);

    /**
     * 코너 컨텐츠 정보 삭제 처리
     */
    void deletePrConrContInfo(PrConrContInfo prConrContInfo);

    /**
     * 전시 대상 세트 목록 조회 (브랜드)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoBrandList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (브랜드)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoListBrandCount(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 연결관리 팝업 _ 브랜드 탭 _ 브랜드 상세조회
     */
    PrBrandMstResponse getBrandDetail(PrBrandMstRequest prBrandMstRequest);

    /**
     * 전시 대상 세트 목록 조회 (기획전)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoMkdpList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (기획전)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoMkdpListCount(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 대상 세트 목록 조회 (HTML)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoHtmlList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (HTML)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoHtmlListCount(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 연결관리 팝업 _ HTML 탭 _ HTML 상세조회
     */
    PrConrContInfoResponse getPrConrContInfoHtmlDetail(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 연결 관리 > 탭 _ HTML 등록
     */
    void prConrContInfoInsert(PrConrContInfo prConrContInfo);

    /**
     * 전시 대상 세트 목록 조회 (이미지 배너)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoImgList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (이미지 배너)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoImgListCount(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 연결관리 팝업 _ 이미지 배너 탭 _ 이미지 배너 상세조회
     */
    PrConrContInfoResponse getPrConrContInfoImgDetail(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 전시 대상 세트 목록 조회 (Text 배너)
     * @param prConrContInfoRequest
     * @return
     */
    List<PrConrContInfoResponse> getPrConrContInfoTextList(PrConrContInfoRequest prConrContInfoRequest);

    /**
     * 코너 컨텐츠 정보 목록 수 조회 (Text 배너)
     * @param prConrContInfoRequest
     * @return
     */
    int getPrConrContInfoTextListCount(PrConrContInfoRequest prConrContInfoRequest);

}
