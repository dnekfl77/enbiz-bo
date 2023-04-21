package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrDispGoodsInfo;

@Repository
@Lazy
public interface PrDispGoodsInfoTrxMapper {

    /**
     * 매장 전시상품 목록 등록
     * @return
     * @throws Exception
     */
    void insertPrDispGoodsInfo(PrDispGoodsInfo prDispGoodsInfo) throws Exception;

    /**
     * 매장 전시상품 목록 수정
     * @return
     * @throws Exception
     */
    void updatePrDispGoodsInfo(PrDispGoodsInfo prDispGoodsInfo) throws Exception;

    /**
     * 매장 전시상품 목록 삭제
     * @return
     * @throws Exception
     */
    void deletePrDispGoodsInfo(PrDispGoodsInfo prDispGoodsInfo) throws Exception;

}
