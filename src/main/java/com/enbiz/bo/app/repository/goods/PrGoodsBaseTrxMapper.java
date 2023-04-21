package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsBase;

/**
 * 상품 관리 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsBaseTrxMapper {

    /**
     * 단품 상태에 따른 상품 판매상태 변경 update
     * @param prGoodsBase
     */
    void updateGoodsItmChangesDueToGoodsSaleStatus(PrGoodsBase prGoodsBase);

    /**
     * 판매방식 변경 update
     * @param prGoodsBase
     */
    void updateSaleMethCd(PrGoodsBase prGoodsBase);

    /**
     * 일반상품 상세 > 일반 상품 수정
     * @param prGoodsBase
     */
    void updatePrGoodsBase(PrGoodsBase prGoodsBase);

    /**
     * 묶음상품 상세 > 묶음 상품 수정
     * @param prGoodsBase
     */
    void updatePkgPrGoodsBase(PrGoodsBase prGoodsBase);

}
