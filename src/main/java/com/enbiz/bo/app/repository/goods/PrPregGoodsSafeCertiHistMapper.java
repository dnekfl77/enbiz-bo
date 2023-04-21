package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsSafeCertiHist;

import java.util.List;

/**
 * 가등록 상품안전인증이력 DAO
 */
@Repository
@Lazy
public interface PrPregGoodsSafeCertiHistMapper {

    /**
     * 임시 일반상품 상세 > 임시 상품안전인증이력 조회
     * @param pregGoodsNo
     * @return
     */
    List<PrPregGoodsSafeCertiHist> getPregGoodsSafeCertiHistList(String pregGoodsNo);

}
