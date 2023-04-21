package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrEvltValInfo;

/**
 * 평가값정보 Trx DAO
 */
@Repository
@Lazy
public interface PrEvltValInfoTrxMapper {

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가값 추가
     * @param prEvltValInfo
     */
    void insertPrEvltValInfo(PrEvltValInfo prEvltValInfo);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가값 수정
     * @param prEvltValInfo
     */
    void updatePrEvltValInfo(PrEvltValInfo prEvltValInfo);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가값 삭제
     * @param prEvltValInfo
     */
    void deletePrEvltValInfo(PrEvltValInfo prEvltValInfo);

}
