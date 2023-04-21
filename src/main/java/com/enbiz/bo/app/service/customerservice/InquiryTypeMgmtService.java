package com.enbiz.bo.app.service.customerservice;

import java.util.List;

import com.enbiz.bo.app.dto.request.customerservice.InquireTypeRequest;
import com.enbiz.bo.app.dto.response.customerservice.InquireTypeResponse;
import com.enbiz.bo.app.entity.CsCustInqTypCd;

/**
 * 문의유형관리 서비스
 */
public interface InquiryTypeMgmtService {
	
	/**
     * 문의유형-대 조회
     * @param useYn
     * @return
     * @throws Exception
     */
    List<InquireTypeResponse> getInquiryTypeLarge(InquireTypeRequest inquireTypeRequest) throws Exception;

    /**
     * 문의유형-대 조회
     * @param useYn
     * @return
     * @throws Exception
     */
    int getInquiryTypeLCount(InquireTypeRequest inquireTypeRequest) throws Exception;

    /**
     * 문의유형-소 조회
     * @param inquireTypeRequest
     * @return
     * @throws Exception
     */
    List<InquireTypeResponse> getInquiryTypeSmall(InquireTypeRequest inquireTypeRequest) throws Exception;

    /**
     * 문의유형-소 조회
     * @param inquireTypeRequest
     * @return
     * @throws Exception
     */
    int getInquiryTypeSmallCount(InquireTypeRequest inquireTypeRequest) throws Exception;

    /**
     * 문의유형-소 No-Paging 조회
     * @param inquireTypeRequest
     * @return
     * @throws Exception
     */
    List<InquireTypeResponse> getInquiryTypeSmallNoPaging(InquireTypeRequest inquireTypeRequest) throws Exception;

    /**
     * 문의유형 등록 및 업데이트
     * @param createList
     * @param updateList
     * @throws Exception
     */
    void saveInquiryType(List<CsCustInqTypCd> createList, List<CsCustInqTypCd> updateList) throws Exception;
}
