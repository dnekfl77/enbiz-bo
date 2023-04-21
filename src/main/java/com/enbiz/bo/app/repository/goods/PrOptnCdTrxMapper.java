package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrOptnCd;

/**
 * 옵션코드 Trx DAO
 */
@Repository
@Lazy
public interface PrOptnCdTrxMapper {

    /**
     * 옵션관리 > 옵션코드 등록
     * @param prOptnCd
     */
    void insertPrOptnCd(PrOptnCd prOptnCd);

    /**
     * 옵션관리 > 옵션코드 수정
     * @param prOptnCd
     */
    void updatePrOptnCd(PrOptnCd prOptnCd);

}
