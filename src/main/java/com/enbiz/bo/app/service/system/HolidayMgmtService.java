package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.HolidayMgmtRequest;
import com.enbiz.bo.app.dto.response.system.HolidayMgmtResponse;
import com.enbiz.bo.app.entity.StHoliInfo;

public interface HolidayMgmtService {

    /**
     * 휴일 목록 조회
     * @param  HolidayMgmtRequest
     * @return  그룹 목록
     * @throws Exception
     */
    List<HolidayMgmtResponse> getHolidayList(HolidayMgmtRequest HolidayMgmtRequest);

    /**
     * 휴일 목록 Count
     * @param  HolidayMgmtRequest
     * @return  그룹 목록
     * @throws Exception
     */
    int getHolidayListCount(HolidayMgmtRequest HolidayMgmtRequest) throws Exception;

    /**
     * 휴일 CRUD
     * @param  StHoliInfo
     * @return  그룹 목록
     * @throws Exception
     */
    void saveHolidayList(List<StHoliInfo> createList, List<StHoliInfo> updateList, List<StHoliInfo> deleteList) throws Exception;

    /**
     * 휴일 신규 등록
     * @param createList 신규 목록
     * @throws Exception
     */
    void registHoliday(List<StHoliInfo> createList) throws Exception;

    /**
     * 휴일 수정 처리
     * @param updateList 수정 목록
     * @throws Exception
     */
    void modifyHoliday(List<StHoliInfo> updateList) throws Exception;

    /**
     * 휴일 삭제 처리
     * @param deleteList 삭제 목록
     * @throws Exception
     */
    void deleteHoliday(List<StHoliInfo> deleteList) throws Exception;

    /**
     * 휴일 일괄등록
     * @param createList
     * @return 업로드 실패 목록
     * @throws Exception
     */
    List<StHoliInfo> registHolidayExcelList(List<StHoliInfo> createList) throws Exception;

}
