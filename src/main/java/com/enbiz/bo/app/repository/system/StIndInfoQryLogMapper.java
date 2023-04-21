package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StIndInfoQryLog;

@Repository
@Lazy
public interface StIndInfoQryLogMapper {

    void insertStIndInfoQryLog(StIndInfoQryLog stIndInfoQryLog) throws Exception;

}
