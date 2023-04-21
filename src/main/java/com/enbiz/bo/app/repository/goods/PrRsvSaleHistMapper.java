package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.ReservationGoodsMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.ReservationGoodsMgmtResponse;
import com.enbiz.bo.app.entity.PrRsvSaleHist;

/**
 * 예약상품이력 DAO
 */
@Repository
@Lazy
public interface PrRsvSaleHistMapper {

    /**
     * 예약상품관리 > 일반판매 목록 조회
     * @param request
     * @return
     */
    List<ReservationGoodsMgmtResponse> getReservationNormalSaleGoodsList(ReservationGoodsMgmtRequest request);

    /**
     * 예약상품관리 > 일반판매 목록 수 조회
     * @param request
     * @return
     */
    int getReservationNormalSaleGoodsListCount(ReservationGoodsMgmtRequest request);

    /**
     * 예약상품관리 > 예약판매 목록 조회
     * @param request
     * @return
     */
    List<ReservationGoodsMgmtResponse> getReservationRsvSaleGoodsList(ReservationGoodsMgmtRequest request);

    /**
     * 예약상품관리 > 예약판매 목록 수 조회
     * @param request
     * @return
     */
    int getReservationRsvSaleGoodsListCount(ReservationGoodsMgmtRequest request);

    /**
     * 예약상품관리 > 예약상품 변경이력 조회
     * @param goodsNo
     * @return
     */
    List<ReservationGoodsMgmtResponse> getReservationSaleHistList(String goodsNo);

    /**
     * 일반상품 상세 > 예약판매이력 조회
     * @param goodsNo
     * @return
     */
    PrRsvSaleHist getRsvSaleHist(String goodsNo);

}
