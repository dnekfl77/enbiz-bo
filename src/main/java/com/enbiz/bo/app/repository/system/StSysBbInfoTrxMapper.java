package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StSysBbInfo;

@Repository
@Lazy
public interface StSysBbInfoTrxMapper {

    int insertStSysBbInfo(StSysBbInfo stSysBbInfo);

    int updateStSysBbInfo(StSysBbInfo stSysBbInfo);

    int updateStSysBbInfoQryCnt(String bbcNo);
}
