package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.goods.TemporaryRelatedGoodsResponse;

import java.util.List;

/**
 * 가등록 관계상품정보 DAO
 */
@Repository
@Lazy
public interface PrPregRelGoodsInfoMapper {

    /**
     * 가등록 묶음상품 상세 > 관계상품 목록 조회
     * @param pregBaseGoodsNo
     * @return
     */
    List<TemporaryRelatedGoodsResponse> getPregRelGoodsInfoList(String pregBaseGoodsNo);

}
