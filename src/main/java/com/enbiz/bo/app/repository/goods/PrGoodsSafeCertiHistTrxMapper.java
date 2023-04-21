package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsSafeCertiHist;

/**
 * 상품안전인증이력 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsSafeCertiHistTrxMapper {

    /**
     * 일반상품 상세 > 안전인증이력 전체 삭제
     * @param goodsNo
     */
    void deleteAllGoodsSafeCertiHist(String goodsNo);

    /**
     * 일반상품 상세 > 안전인증이력 추가
     * @param prGoodsSafeCertiHist
     */
    void insertGoodsSafeCertiHist(PrGoodsSafeCertiHist prGoodsSafeCertiHist);

}
