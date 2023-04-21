package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.CustomerNoticeRequest;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeResponse;
import com.enbiz.bo.app.entity.PrNtcInfo;

@Repository
@Lazy
public interface PrNtcInfoMapper {

    /**
     * 고객공지사항관리 > 고객공지사항 목록 수 조회
     * @param request
     * @return
     */
    int getCustomerNoticeListCount(CustomerNoticeRequest request);

    /**
     * 고객공지사항관리 > 고객공지사항 목록 조회
     * @param request
     * @return
     */
    List<CustomerNoticeResponse> getCustomerNoticeList(CustomerNoticeRequest request);

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 정보 조회
     * @param ntcNo
     * @return
     */
    CustomerNoticeResponse getCustomerNoticeInfo(String ntcNo);

}
