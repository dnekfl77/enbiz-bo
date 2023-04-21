package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.response.goods.TemporaryAssociatedGoodsResponse;

import java.util.List;

/**
 * 가등록 연관상품정보 DAO
 */
@Repository
@Lazy
public interface PrPregAssocGoodsInfoMapper {

    /**
     * 임시 일반상품 상세 > 임시 연관상품 목록 조회
     * @param pregGoodsNo
     * @return
     */
    List<TemporaryAssociatedGoodsResponse> getPregAssocGoodsList(String pregGoodsNo);
}
