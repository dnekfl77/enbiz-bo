package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrStdCtgEvltItemInfo;

/**
 * 표준카테고리평가항목정보 Trx DAO
 */
@Repository
@Lazy
public interface PrStdCtgEvltItemInfoTrxMapper {

    /**
     * 리뷰평가항목관리 > 평가항목-표준분류 매핑관리 > 표준카테고리평가항목 추가
     * @param prStdCtgEvltItemInfo
     */
    void insertPrStdCtgEvltItemInfo(PrStdCtgEvltItemInfo prStdCtgEvltItemInfo);

    /**
     * 리뷰평가항목관리 > 평가항목-표준분류 매핑관리 > 표준카테고리평가항목 수정
     * @param prStdCtgEvltItemInfo
     */
    void updatePrStdCtgEvltItemInfo(PrStdCtgEvltItemInfo prStdCtgEvltItemInfo);

    /**
     * 리뷰평가항목관리 > 평가항목-표준분류 매핑관리 > 표준카테고리평가항목 삭제
     * @param prStdCtgEvltItemInfo
     */
    void deletePrStdCtgEvltItemInfo(PrStdCtgEvltItemInfo prStdCtgEvltItemInfo);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목에 매핑된 표준분류 삭제
     * @param evltItemNo
     */
    void deleteEvltItemMappingStdCtg(String evltItemNo);

}
