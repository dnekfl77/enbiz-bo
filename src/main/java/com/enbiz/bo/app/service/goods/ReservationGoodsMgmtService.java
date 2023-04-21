package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.ReservationGoodsMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.ReservationGoodsModifyRequest;
import com.enbiz.bo.app.dto.response.goods.ReservationGoodsMgmtResponse;

/**
 * 예약상품관리 Service
 */
public interface ReservationGoodsMgmtService {

    /**
     * 에약상품 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<ReservationGoodsMgmtResponse> getReservationGoodsList(ReservationGoodsMgmtRequest request) throws Exception ;

    /**
     * 에약상품 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getReservationGoodsListCount(ReservationGoodsMgmtRequest request) throws Exception;

    /**
     * 예약상품 일괄등록/해제
     * @param request
     * @throws Exception
     */
    void modifyGoodsSaleMethod(ReservationGoodsModifyRequest request) throws Exception;

    /**
     * 예약상품 정보 조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    ReservationGoodsMgmtResponse getReservationGoodsInfo(String goodsNo) throws Exception;
    
    /**
     * 예약상품이력 조회
     * @param goodsNo
     * @return
     * @throws Exception
     */
    List<ReservationGoodsMgmtResponse> getReservationGoodsHistory(String goodsNo) throws Exception ;
}
