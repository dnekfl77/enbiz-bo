package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StLoginLog;

@Repository
@Lazy
public interface StLoginLogTrxMapper {
    /**
     * 로그인 로그
     * @param stLoginLog
     * @throws Exception
     */
    void insertStLoginLog(StLoginLog stLoginLog) throws Exception;

    /**
     * 로그 아웃 로그
     * @param stLoginLog
     * @throws Exception
     */
    void updateStLoginLog(StLoginLog stLoginLog) throws Exception;
}
