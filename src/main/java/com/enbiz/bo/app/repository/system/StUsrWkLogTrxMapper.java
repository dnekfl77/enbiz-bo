package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StUsrWkLog;

@Repository
@Lazy
public interface StUsrWkLogTrxMapper {

    /**
     * 작업 로그 저장
     * @param stUsrWkLog
     * @throws Exception
     */
    void insertStUsrWkLog(StUsrWkLog stUsrWkLog) throws Exception;
}
