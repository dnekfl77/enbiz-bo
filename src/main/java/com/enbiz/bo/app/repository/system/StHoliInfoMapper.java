package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.HolidayMgmtRequest;
import com.enbiz.bo.app.dto.response.system.HolidayMgmtResponse;
import com.enbiz.bo.app.entity.StHoliInfo;

@Repository
@Lazy
public interface StHoliInfoMapper {

    /**
     * 휴일 목록
     * @param HolidayMgmtRequest
     * @return List<HolidayMgmtResponse>
     */
    List<HolidayMgmtResponse> getHolidayList(HolidayMgmtRequest HolidayMgmtRequest);

    /**
     * 휴일 목록 count
     * @param HolidayMgmtRequest
     * @return int
     */
    int getHolidayListCount(HolidayMgmtRequest HolidayMgmtRequest);

    /**
     * 휴일 중복 여부 확인
     * @param stHoliInfo
     * @return
     */
    boolean checkDuplicatedHoliday(StHoliInfo stHoliInfo);
}
