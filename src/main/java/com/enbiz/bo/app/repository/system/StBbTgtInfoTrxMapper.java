package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StBbTgtInfo;

@Repository
@Lazy
public interface StBbTgtInfoTrxMapper {
    int insertStBbTgtInfo(StBbTgtInfo stBbTgtInfo);

    int deleteStBbTgtInfo(StBbTgtInfo stBbTgtInfo);
}
