package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StHoliInfo;

@Repository
@Lazy
public interface StHoliInfoTrxMapper {

    /**
     * 휴일 등록
     */
    void insertHoliday(StHoliInfo stHoliInfo);

    /**
     * 휴일 수정
     */
    void updateHoliday(StHoliInfo stHoliInfo);

    /**
     * 휴일 삭제
     */
    void deleteHoliday(StHoliInfo stHoliInfo);
}
