package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregAdveWrdHist;

import java.util.List;

/**
 * 가등록 상품홍보문구이력 DAO
 */
@Repository
@Lazy
public interface PrPregAdveWrdHistMapper {

    /**
     * 임시 일반상품 상세 > 임시 상품홍보문구이력 조회
     * @param pregGoodsNo
     * @return
     */
    List<PrPregAdveWrdHist> getPregAdveWrdHistList(String pregGoodsNo);

}
