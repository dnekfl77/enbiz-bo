package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsQaAnsInfo;

/**
 * 상품Q&A 답변정보 DAO
 */
@Repository
@Lazy
public interface PrGoodsQaAnsInfoMapper {

    /**
     * 상품Q&A관리 > 상품Q&A상세 > 상품QA 답변목록 조회
     * @param questNo
     * @return
     */
    List<PrGoodsQaAnsInfo> getGoodsQAAnsList(String questNo);

}
