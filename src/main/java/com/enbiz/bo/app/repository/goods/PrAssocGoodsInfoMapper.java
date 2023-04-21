package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.goods.AssociatedGoodsResponse;

/**
 * 연관상품정보 DAO
 */
@Repository
@Lazy
public interface PrAssocGoodsInfoMapper {

    /**
     * 일반상품 상세 > 연관상품 목록 조회
     * @param goodsNo
     * @return
     */
    List<AssociatedGoodsResponse> getAssociatedGoodsList(String goodsNo);

}
