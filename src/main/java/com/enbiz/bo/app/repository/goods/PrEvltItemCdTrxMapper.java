package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrEvltItemCd;

/**
 * 평가항목코드 Trx DAO
 */
@Repository
@Lazy
public interface PrEvltItemCdTrxMapper {

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목 추가
     * @param prEvltItemCd
     */
    void insertPrEvltItemCd(PrEvltItemCd prEvltItemCd);

    /**
     * 리뷰평가항목관리 > 평가항목관리 > 평가항목 수정
     * @param prEvltItemCd
     */
    void updatePrEvltItemCd(PrEvltItemCd prEvltItemCd);

}
