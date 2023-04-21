package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregItmBase;

import java.util.List;

/**
 * 가등록 단품기본 DAO
 */
@Repository
@Lazy
public interface PrPregItmBaseMapper {

    /**
     * 임시 일반상품 상세 > 임시 단품 목록 조회
     * @param pregGoodsNo
     * @return
     */
    List<PrPregItmBase> getPregItemList(String pregGoodsNo);

}

       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
