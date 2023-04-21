package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.goods.RelatedGoodsResponse;

/**
 * 관계상품정보 DAO
 */
@Repository
@Lazy
public interface PrRelGoodsInfoMapper {

    /**
     * 묶음상품 상세 > 관계상품 목록 조회
     * @param baseGoodsNo
     * @return
     */
    List<RelatedGoodsResponse> getPrRelGoodsInfoList(String baseGoodsNo);

}
