package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsPayMeanInfo;

/**
 * 상품 결제 수단 정보 DAO
 */
@Repository
@Lazy
public interface PrGoodsPayMeanInfoMapper {

    /**
     * 일반상품 상세 > 결제 수단 목록 조회
     * @param goodsNo
     * @return
     */
    List<PrGoodsPayMeanInfo> getGoodsPayMeanList(String goodsNo);

}
