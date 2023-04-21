package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsInfoModificationHistoryRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.PackageTargetGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.WebStockMgmtRequest;
import com.enbiz.bo.app.dto.request.popup.GoodsPopupRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsBaseResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsInfoModificationHistoryResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsMgmtResponse;
import com.enbiz.bo.app.dto.response.goods.PackageTargetGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.ReservationGoodsMgmtResponse;
import com.enbiz.bo.app.dto.response.goods.WebStockMgmtResponse;
import com.enbiz.bo.app.dto.response.popup.GoodsPopupResponse;

/**
 * 상품 기본 DAO
 */
@Repository
@Lazy
public interface PrGoodsBaseMapper {

    /**
     * 상품조회팝업 > 상품 목록 수 조회
     * @param goodsPopupRequest
     * @return 상품 목록 수
     * @throws Exception
     */
    int getPopupGoodsListCount(GoodsPopupRequest goodsPopupRequest);

    /**
     * 상품조회팝업 > 상품 목록 조회
     * @param goodsPopupRequest
     * @return 상품목록
     * @throws Exception
     */
    List<GoodsPopupResponse> getPopupGoodsList(GoodsPopupRequest goodsPopupRequest);

    /**
     * 상품관리 > 상품 목록 수 조회
     * @param request
     * @return
     */
    int getGoodsListCount(GoodsMgmtRequest request);

    /**
     * 상품관리 > 상품 목록 조회
     * @param request
     * @return
     */
    List<GoodsMgmtResponse> getGoodsList(GoodsMgmtRequest request);

    /**
     * 일반, 묶음상품 상세 > 상품정보 조회
     * @param goodsNo
     * @return
     */
    GoodsBaseResponse getGoodsInfo(String goodsNo);

    /**
     * 메인 >
     * @return
     */
    int getDashboardGoodsTodayNewCnt();

    /**
     * 메인 >
     * @return
     */
    int getDashboardGoods2WeekSellingCnt();

    /**
     * 웹재고관리(위수탁) > 웹재고관리 목록 수 조회
     * @param request
     * @return
     */
    int getWebStockListCount(WebStockMgmtRequest request);

    /**
     * 웹재고관리(위수탁) > 웹재고관리 목록 조회
     * @param request
     * @return
     */
    List<WebStockMgmtResponse> getWebStockList(WebStockMgmtRequest request);

    /**
     * 상품정보수정이력조회 > 수정상품정보 목록 수 조회
     * @param request
     * @return
     */
    int getModifiedGoodsListCount(GoodsInfoModificationHistoryRequest request);

    /**
     * 상품정보수정이력조회 > 수정상품정보 목록 조회
     * @param request
     * @return
     */
    List<GoodsInfoModificationHistoryResponse> getModifiedGoodsList(GoodsInfoModificationHistoryRequest request);

    /**
     * 예약상품관리 > 예약상품이력조회팝업 > 예약상품 정보조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    ReservationGoodsMgmtResponse getRsvGoodsInfo(String goodsNo);

    /**
     * 임시 묶음상품 등록/상세 > 묶음대상 상품조회 팝업 > 상품목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getPackageTargetGoodsListCount(PackageTargetGoodsRequest request);

    /**
     * 임시 묶음상품 등록/상세 > 묶음대상 상품조회 팝업 > 상품목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<PackageTargetGoodsResponse> getPackageTargetGoodsList(PackageTargetGoodsRequest request);

}
