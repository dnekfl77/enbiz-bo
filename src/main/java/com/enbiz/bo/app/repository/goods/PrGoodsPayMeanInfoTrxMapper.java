package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsPayMeanInfo;

/**
 * 상품 결제 수단 정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsPayMeanInfoTrxMapper {

    /**
     * 일반상품 상세 > 결제 수단 전체 삭제
     * @param goodsNo
     */
    void deleteAllGoodsPayMean(String goodsNo);

    /**
     * 일반상품 상세 > 결제 수단 추가
     * @param prGoodsPayMeanInfo
     */
    void insertGoodsPayMeanInfo(PrGoodsPayMeanInfo prGoodsPayMeanInfo);

}
