package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrPregItmOptnInfo;

import java.util.List;

/**
 * 가등록 단품옵션정보 DAO
 */
@Repository
@Lazy
public interface PrPregItmOptnInfoMapper {

    /**
     * 임시 일반상품 상세 > 정렬된 임시 단품옵션정보 목록 조회 ( 옵션분류별 옵션번호 )
     * @param pregGoodsNo
     * @return
     */
    List<PrPregItmOptnInfo> getClassifiedPregItmOptnInfoList(String pregGoodsNo);

}
