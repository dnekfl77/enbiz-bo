package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrFaqInfo;

@Repository
@Lazy
public interface PrFaqInfoTrxMapper {

    /**
     * FAQ관리 목록 수정
     * @param prFaqInfo
     * @return
     */
    void updatePrFaqInfo(PrFaqInfo prFaqInfo);

    /**
     * FAQ관리팝업 저장
     * @param prFaqInfo
     * @return
     */
    void insertPopupPrFaqInfo(PrFaqInfo prFaqInfo);

    /**
     * FAQ관리 상세수정
     * @param prFaqInfo
     * @return
     */
    void updatePopupPrFaqInfo(PrFaqInfo prFaqInfo);

}
