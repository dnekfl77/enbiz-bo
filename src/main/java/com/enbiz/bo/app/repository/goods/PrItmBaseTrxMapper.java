package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrItmBase;

/**
 * 단품관리 Trx DAO
 */
@Repository
@Lazy
public interface PrItmBaseTrxMapper {

    /**
     * 단품 기본 update
     * @param prItmBase
     */
    void updatePrItemBase(PrItmBase prItmBase);

    /**
     * 웹재고관리(위수탁) > 단품 재고수량 변경
     * @param prItmBase
     */
    void updatePrItemStkQty(PrItmBase prItmBase);


}
