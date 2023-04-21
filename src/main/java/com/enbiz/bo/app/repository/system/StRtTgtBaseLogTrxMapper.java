package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StRtTgtBaseLog;

@Repository
@Lazy
public interface StRtTgtBaseLogTrxMapper {
    /**
     * 메뉴 사용 현황 저장
     */
    void insertStRtTgtBaseLog(StRtTgtBaseLog stRtTgtBaseLog) throws Exception;
}