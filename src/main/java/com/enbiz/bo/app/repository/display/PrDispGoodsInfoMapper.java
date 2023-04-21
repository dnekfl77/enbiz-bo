package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository
@Lazy
public interface PrDispGoodsInfoMapper {

    /**
     * 매장 전시상품 목록 삭제
     * @return
     * @throws Exception
     */
    String[] checkPrDispGoodsInfo(String getDispCtgNo) throws Exception;
}
