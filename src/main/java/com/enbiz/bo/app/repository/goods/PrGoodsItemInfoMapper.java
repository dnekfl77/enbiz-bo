package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsItemInfo;

/**
 * 상품항목정보 DAO
 */
@Repository
@Lazy
public interface PrGoodsItemInfoMapper {

    /**
     * 일반상품 상세 > 상품항목목록 조회
     * @param goodsNo
     * @return
     */
    List<PrGoodsItemInfo> getGoodsItemList(String goodsNo);
}
