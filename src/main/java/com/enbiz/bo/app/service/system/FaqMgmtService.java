package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.FaqRequest;
import com.enbiz.bo.app.dto.response.system.FaqResponse;
import com.enbiz.bo.app.entity.PrFaqInfo;

/**
 * FAQ 관리 서비스
 */
public interface FaqMgmtService {
	/**
     * FAQ관리 목록 조회
     * @param  faqRequest
     * @return FAQ관리 목록
     * @throws Exception
     */
    public List<FaqResponse> getFaqList(FaqRequest faqRequest) throws Exception;

    /**
     * FAQ관리 목록 수
     * @param  faqRequest
     * @return 목록 수
     * @throws Exception
     */
    public int getFaqListCount(FaqRequest faqRequest) throws Exception;

    /**
     * FAQ관리 상세조회
     * @param faqRequest
     * @return
     * @throws Exception
     */
    public FaqResponse getFaqDetail(FaqRequest faqRequest) throws Exception;

    /**
     * FAQ관리 목록 수정
     * @param updateList
     */
    public void saveFaqList(List<PrFaqInfo> updateList);

    /**
     * FAQ관리팝업 입력
     * @param prFaqInfo
     */
    public void registFaqInfo(PrFaqInfo prFaqInfo);

    /**
     * FAQ관리팝업 수정
     * @param prFaqInfo
     */
    public void modifyFaqInfo(PrFaqInfo prFaqInfo);

    /**
     * FAQ관리의 대분류, 중분류 중복여부 확인
     * @param faqRequest
     */
    public boolean faqOverLapCheck(FaqRequest faqRequest);
}
