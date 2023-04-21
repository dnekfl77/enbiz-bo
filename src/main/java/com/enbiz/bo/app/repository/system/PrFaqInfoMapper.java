package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.FaqRequest;
import com.enbiz.bo.app.dto.response.system.FaqResponse;

@Repository
@Lazy
public interface PrFaqInfoMapper {

    /**
     * FAQ관리 목록 조회
     * @param faqRequest
     * @return
     */
    List<FaqResponse> getFaqList(FaqRequest faqRequest);

    /**
     * FAQ관리 목록 수
     * @param faqRequest
     * @return int
     */
    int getFaqListCount(FaqRequest faqRequest);

    /**
     * FAQ관리 상세조회
     * @param faqRequest
     * @return
     */
    FaqResponse getFaqDetail(FaqRequest faqRequest);

    /**
     * FAQ관리의 대분류, 중분류 중복여부 확인
     * @param faqRequest
     * @return
     */
    int faqOverLapCheck(FaqRequest faqRequest);

}
