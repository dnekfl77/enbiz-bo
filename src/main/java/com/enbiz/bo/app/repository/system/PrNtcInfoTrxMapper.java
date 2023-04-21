package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.CustomerNoticeRequest;
import com.enbiz.bo.app.dto.response.system.CustomerNoticeResponse;
import com.enbiz.bo.app.entity.PrNtcInfo;

@Repository
@Lazy
public interface PrNtcInfoTrxMapper {

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 등록
     * @param prNtcInfo
     */
    void insertCustomerNoticeInfo(PrNtcInfo prNtcInfo);

    /**
     * 고객공지사항관리 > 고객공지사항 등록/수정 팝업 > 공지 수정
     * @param prNtcInfo
     */
    void updateCustomerNoticeInfo(PrNtcInfo prNtcInfo);

}
