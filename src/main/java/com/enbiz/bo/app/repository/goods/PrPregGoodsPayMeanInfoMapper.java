package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregGoodsPayMeanInfo;

import java.util.List;

/**
 * 가등록 상품결제수단정보 DAO
 */
@Repository
@Lazy
public interface PrPregGoodsPayMeanInfoMapper {

    /**
     * 임시 일반상품 상세 > 임시 상품결제수단정보 목록 조회
     * @param pregGoodsNo
     * @return
     */
    List<PrPregGoodsPayMeanInfo> getPregGoodsPayMeanInfoList(String pregGoodsNo);

}
