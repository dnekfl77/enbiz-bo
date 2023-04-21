package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StBldgAddrInfo;

@Repository
@Lazy
public interface StBldgAddrInfoTrxMapper {
    /**
     * 건물 정보 수정
     * @param stBldgAddrInfo
     * @return int
     */
    int updateBldgAddrInfo(StBldgAddrInfo stBldgAddrInfo);
}
