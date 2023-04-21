package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrRsvSaleHist;

/**
 * 예약상품이력 Trx DAO
 */
@Repository
@Lazy
public interface PrRsvSaleHistTrxMapper {

    /**
     * 일반상품 상세 > 예약판매이력 중단처리
     * @param request
     * @throws Exception
     */
    void stopRsvSaleHist(PrRsvSaleHist request);

    /**
     * 예약상품관리 > 예약판매이력 추가
     * @param request
     * @throws Exception
     */
    void insertRsvSaleHist(PrRsvSaleHist request);

    /**
     * 일반상품 상세 > 예약판매이력 수정
     * @param request
     */
    void updateRsvSaleHist(PrRsvSaleHist request);

}
