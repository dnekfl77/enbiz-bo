package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.InquireTypeRequest;
import com.enbiz.bo.app.dto.response.customerservice.InquireTypeResponse;

@Repository
@Lazy
public interface CsCustInqTypCdMapper {


    /**
     * 문의유형-대 조회
     * @param inquireTypeRequest
     * @return
     * @throws Exception
     */
    List<InquireTypeResponse> getInquiryTypeLarge(InquireTypeRequest inquireTypeRequest) throws Exception;

    /**
     * 문의유형-대 조회
     * @param inquireTypeRequest
     * @return
     * @throws Exception
     */
    int getInquiryTypeLargeCount(InquireTypeRequest inquireTypeRequest) throws Exception;

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
     * 문의유형-소 no-paging조회
     * @param inquireTypeRequest
     * @return
     * @throws Exception
     */
    List<InquireTypeResponse> getInquiryTypeSmallNoPaging(InquireTypeRequest inquireTypeRequest) throws Exception;
}
