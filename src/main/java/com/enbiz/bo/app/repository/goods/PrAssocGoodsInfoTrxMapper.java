package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrAssocGoodsInfo;

/**
 * 연관상품정보 Trx DAO
 */
@Repository
@Lazy
public interface PrAssocGoodsInfoTrxMapper {

    /**
     * 일반상품 상세 > 연관상품 등록
     * @param prAssocGoodsInfo
     */
    void insertAssociatedGoods(PrAssocGoodsInfo prAssocGoodsInfo);

    /**
     * 일반상품 상세 > 연관상품 수정
     * @param prAssocGoodsInfo
     */
    void updateAssociatedGoodsInfo(PrAssocGoodsInfo prAssocGoodsInfo);

    /**
     * 일반상품 상세 > 연관상품 삭제
     * @param prAssocGoodsInfo
     */
    void deleteAssociatedGoods(PrAssocGoodsInfo prAssocGoodsInfo);

}
