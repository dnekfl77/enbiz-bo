package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsItemInfo;

import java.util.List;

/**
 * 가등록 상품항목정보 DAO
 */
@Repository
@Lazy
public interface PrPregGoodsItemInfoMapper {

    /**
     * 임시 일반상품 상세 > 상품항목 목록 조회
     * @param pregGoodsNo
     * @return
     */
    List<PrPregGoodsItemInfo> getPregGoodsItemList(String pregGoodsNo);

    /**
     * 임시 일반상품 상세  > 상품항목정보에 등록된 상품고시품목코드 조회
     * @param pregGoodsNo
     * @return
     */
    String getPregGoodsNotiLisartCode(String pregGoodsNo);

}
