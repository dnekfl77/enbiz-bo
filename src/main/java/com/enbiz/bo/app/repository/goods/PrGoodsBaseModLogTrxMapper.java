package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsBaseModLog;

/**
 * 상품기본수정로그 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsBaseModLogTrxMapper {

    /**
     * 상품 수정 로그 추가
     * @param prGoodsBaseModLog
     */
    void insertPrGoodsBaseModLog(PrGoodsBaseModLog prGoodsBaseModLog);

}
