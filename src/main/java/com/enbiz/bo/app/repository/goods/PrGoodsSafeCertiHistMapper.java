package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsSafeCertiHist;

/**
 * 상품안전인증이력 DAO
 */
@Repository
@Lazy
public interface PrGoodsSafeCertiHistMapper {

    /**
     * 일반상품 상세 > 안전인증이력 목록 조회
     * @param goodsNo
     * @return
     */
    List<PrGoodsSafeCertiHist> getGoodsSafeCertiHistList(String goodsNo);

}
