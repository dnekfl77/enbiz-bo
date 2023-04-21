package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrOptnClssCd;

/**
 * 옵션분류코드 Trx DAO
 */
@Repository
@Lazy
public interface PrOptnClssCdTrxMapper {

    /**
     * 옵션관리 > 옵션분류코드 등록
     * @param prOptnClssCd
     */
    void insertPrOptnClssCd(PrOptnClssCd prOptnClssCd);

    /**
     * 옵션관리 > 옵션분류코드 수정
     * @param prOptnClssCd
     */
    void updatePrOptnClssCd(PrOptnClssCd prOptnClssCd);
}
