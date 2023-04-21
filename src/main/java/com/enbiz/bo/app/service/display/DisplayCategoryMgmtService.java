package com.enbiz.bo.app.service.display;

import java.util.List;

import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrDispGoodsInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrDispGoodsInfoResponse;
import com.enbiz.bo.app.entity.PrDispCtgBase;
import com.enbiz.bo.app.entity.PrDispGoodsInfo;
import com.enbiz.bo.app.entity.PrDpmlBase;

/**
 * 전시 카테고리 관리 서비스
 */
public interface DisplayCategoryMgmtService {

    /**
     * 사이트 리스트 조회
     * @return
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getCcSiteBase() throws Exception;

    /**
     * 전시 카테고리 관리 Tree 리스트
     * @param  prDispCtgBaseRequest
     * @return 전시 카테고리 관리 Tree 리스트
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 사이트 이름 조회
     * @return
     * @throws Exception
     */
    String getSiteName(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 몰 정보 등록 저장 _ 전시몰기본, 전시카테고리 기본
     * @param prDpmlBase
     * @throws Exception
     */
    void prDpmlBaseInsert(PrDpmlBase prDpmlBase) throws Exception;

    /**
     * 전시 카테고리 관리 _ 몰 정보
     * @return
     * @throws Exception
     */
    PrDispCtgBaseResponse getMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 전시 카테고리 관리 _ 전시 카테고리 매장정보
     * @return
     * @throws Exception
     */
    PrDispCtgBaseResponse getCategoryDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 몰 정보 수정 저장 _ 전시 몰 정보 수정 저장
     * @param prDispCtgBaseRequest
     * @throws Exception
     */
    void saveDisplayCategoryMgmtMallDetail(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 몰 정보 수정 저장 _ 전시 카테고리 정보 수정 저장
     * @return
     * @throws Exception
     */
    void saveCategoryUpdate(PrDispCtgBase prDispCtgBase) throws Exception;

    /**
     * 하위 전시 카테고리 매장 목록
     * @param  prDispCtgBaseRequest
     * @return 하위 전시 카테고리 매장 목록
     * @throws Exception
     */
    List<PrDispCtgBaseResponse> getSubCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 하위 전시 카테고리 매장 목록 수 조회
     * @param  prDispCtgBaseRequest
     * @return 하위 전시 카테고리 매장 목록 수
     * @throws Exception
     */
    int getSubCategoryListCount(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception;

    /**
     * 전시 카테고리 관리 _ 하위 전시 카테고리 매장 목록 입력
     * @param createList
     * @throws Exception
     */
    void insertPrDispCtgBase(PrDispCtgBase prDispCtgBase, List<PrDispCtgBase> createList) throws Exception;

    /**
     * 전시 카테고리 관리 _ 하위 전시 카테고리 매장 목록 수정
     * @param updateList
     * @throws Exception
     */
    void updatePrDispCtgBase(List<PrDispCtgBase> updateList) throws Exception;
    
    /**
     * 전시 카테고리 관리 _ 하위 전시 카테고리 매장 목록 삭제
     * @param deleteList
     * @throws Exception
     */
    void deletePrDispCtgBase(List<PrDispCtgBase> deleteList) throws Exception;
    
    /**
     * 하위 전시 카테고리 매장 목록 저장
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void registCUD(PrDispCtgBase prDispCtgBase, List<PrDispCtgBase> createList, List<PrDispCtgBase> updateList, List<PrDispCtgBase> deleteList) throws Exception;

    /**
     * 하위 전시 카테고리 매장 목록 _ 전시상품 상세 조회
     * @return
     * @throws Exception
     */
    PrDispGoodsInfoResponse getGoodsDetail(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception;

    /**
     * 매장 전시상품 조회 목록
     * @param  prDispGoodsInfoRequest
     * @return 매장 전시상품 조회 목록
     * @throws Exception
     */
    List<PrDispGoodsInfoResponse> getDisplayGoodsList(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception;

    /**
     * 매장 전시상품 조회 목록 수 조회
     * @param  prDispGoodsInfoRequest
     * @return 매장 전시상품 조회 목록 수
     * @throws Exception
     */
    int getDisplayGoodsListCount(PrDispGoodsInfoRequest prDispGoodsInfoRequest) throws Exception;

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 입력
     * @param createList
     * @throws Exception
     */
    void insertPrDispGoodsInfo(List<PrDispGoodsInfo> createList) throws Exception;

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 수정
     * @param updateList
     * @throws Exception
     */
    void updatePrDispGoodsInfo(List<PrDispGoodsInfo> updateList) throws Exception;

    /**
     * 전시 카테고리 관리 _ 매장 전시상품 목록 삭제
     * @param deleteList
     * @throws Exception
     */
    void deletePrDispGoodsInfo(List<PrDispGoodsInfo> deleteList) throws Exception;

    /**
     * 매장 전시상품 목록 저장
     * @param createList 신규 목록
     * @param updateList 수정 목록
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void GoodsCUD(List<PrDispGoodsInfo> createList, List<PrDispGoodsInfo> updateList, List<PrDispGoodsInfo> deleteList) throws Exception;

    /**
     * 전시 카테고리 관리 _ 일괄등록 값 셋팅
     * @param dispCtgNo
     * @param goodsList
     * @throws Exception
     */
    void setValGoodsList(String dispCtgNo, List<PrDispGoodsInfo> goodsList) throws Exception;

    /**
     * 매장 전시상품 목록 엑셀 일괄 저장
     * @param createList 신규 저장
     * @throws Exception
     */
    List<PrDispGoodsInfo> registCUDExcel(List<PrDispGoodsInfo> createList) throws Exception;
}
