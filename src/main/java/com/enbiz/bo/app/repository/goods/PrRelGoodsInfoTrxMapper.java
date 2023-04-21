package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrRelGoodsInfo;

/**
 * 관계상품정보 DAO
 */
@Repository
@Lazy
public interface PrRelGoodsInfoTrxMapper {

    /**
     * 묶음상품상세 > 관계상품 추가
     * @param prRelGoodsInfo
     */
    void insertPrRelGoods(PrRelGoodsInfo prRelGoodsInfo);

    /**
     * 묶음상품상세 > 관계상품 수정
     * @param prRelGoodsInfo
     */
    void updatePrRelGoodsInfo(PrRelGoodsInfo prRelGoodsInfo);

    /**
     * 묶음상품상세 > 관계상품 삭제
     * @param prRelGoodsInfo
     */
    void deletePrRelGoods(PrRelGoodsInfo prRelGoodsInfo);

}
