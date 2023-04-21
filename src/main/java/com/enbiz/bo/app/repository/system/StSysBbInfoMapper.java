package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.dashboard.DashboardNoticeRequest;
import com.enbiz.bo.app.dto.request.system.SystemNoticeListRequest;
import com.enbiz.bo.app.dto.response.dashboard.DashboardNoticeResponse;
import com.enbiz.bo.app.dto.response.system.SystemNoticeListResponse;
import com.enbiz.bo.app.entity.StSysBbInfo;

@Repository
@Lazy
public interface StSysBbInfoMapper {

    long getBbcNo();

    StSysBbInfo getStSysBbInfo(String bbcNo);

    /**
     * 시스템공지관리 조회 (페이징 처리 미포함)
     * @param systemNoticeListRequest
     * @return 시스템공지 목록
     */
    List<SystemNoticeListResponse> getStSysBbInfoList(SystemNoticeListRequest systemNoticeListRequest);

    /**
     * 시스템공지관리 카운트
     * @param systemNoticeListRequest
     * @return 시스템공지 수
     */
    int getBbInfoListTotalCnt(SystemNoticeListRequest systemNoticeListRequest);

    List<DashboardNoticeResponse> getSysNtcInfoListByToday(DashboardNoticeRequest dashboardNoticeRequest);
    
    DashboardNoticeResponse getSysNtcInfoListByTodayDetail(DashboardNoticeRequest dashboardNoticeRequest);
}
