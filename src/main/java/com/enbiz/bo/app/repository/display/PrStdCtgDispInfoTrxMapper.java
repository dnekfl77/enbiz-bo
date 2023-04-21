package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrStdCtgDispInfo;

/**
 * 표준카테고리 전시정보 Trx DAO
 */
@Repository
@Lazy
public interface PrStdCtgDispInfoTrxMapper {

    /**
     * 연결 소전시 카테고리 목록 등록
     * @param prStdCtgDispInfo
     */
    void insertPrStdCtgDispInfo(PrStdCtgDispInfo prStdCtgDispInfo);

     /**
     * 연결 소전시 카테고리 목록 수정
     * @param prStdCtgDispInfo
     */
    void updatePrStdCtgDispInfo(PrStdCtgDispInfo prStdCtgDispInfo);

    /**
     * 연결 소전시 카테고리 목록 삭제
     * @param prStdCtgDispInfo
     */
    void deletePrStdCtgDispInfo(PrStdCtgDispInfo prStdCtgDispInfo);

    /**
     * 임시 일반상품 등록/상세, 일반상품 상세 > 표준카테고리전시정보 등록
     * @param prStdCtgDispInfo
     */
    void insertPrStdCtgDispInfoFromGoods(PrStdCtgDispInfo prStdCtgDispInfo);

    /**
     * 임시 일반상품 등록/상세, 일반상품 상세 > 표준카테고리전시정보 수정
     * @param prStdCtgDispInfo
     */
    void updatePrStdCtgDispInfoFromGoods(PrStdCtgDispInfo prStdCtgDispInfo);

    /**
     * 임시 일반상품 등록/상세, 일반상품 상세 > 표준카테고리전시정보 삭제
     * @param prStdCtgDispInfo
     */
    void deletePrStdCtgDispInfoFromGoods(PrStdCtgDispInfo prStdCtgDispInfo);

}