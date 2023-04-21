package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StUserChgLog;

@Repository
@Lazy
public interface StUserChgLogTrxMapper {

    /**
     * 유저정보 변경 로깅
     * @param stUserChgLog
     */
    void saveStUserChgLog(StUserChgLog stUserChgLog);
}
