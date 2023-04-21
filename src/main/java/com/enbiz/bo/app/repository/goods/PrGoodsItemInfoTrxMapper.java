package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsItemInfo;

/**
 * 상품항목정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsItemInfoTrxMapper {

    /**
     * 일반상품 상세 > 상품항목정보 수정
     * @param prGoodsItemInfo
     */
    void updateGoodsItemInfo(PrGoodsItemInfo prGoodsItemInfo);

}
