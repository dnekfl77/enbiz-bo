package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregPrestHist;

import java.util.List;

/**
 * 가등록 증정품이력 DAO
 */
@Repository
@Lazy
public interface PrPregPrestHistMapper {

    /**
     * 임시 일반상품 상세 > 임시 증정품 이력 조회
     * @param pregGoodsNo
     * @return
     */
    List<PrPregPrestHist> getPregPrestHist(String pregGoodsNo);

}
