package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsRevInfo;

/**
 * 상품리뷰정보 Trx DAO
 */
@Repository
@Lazy
public interface PrGoodsRevInfoTrxMapper {

    /**
     * 리뷰상세 > 리뷰전시상태 변경
     * @param prGoodsRevInfo
     */
    void updateRevDispStatCd(PrGoodsRevInfo prGoodsRevInfo);

    /**
     * 리뷰상세 > 사진전시상태 변경
     * @param prGoodsRevInfo
     */
    void updatePhotoDispStatCd(PrGoodsRevInfo prGoodsRevInfo);

}
