package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StRtInfo;

@Repository
@Lazy
public interface StRtInfoTrxMapper {

    /**
     * 권한 관리 메뉴화면 insert update
     *
     * @param stRtInfo
     * @return
     * @throws Exception
     */
    void saveStRtInfo(StRtInfo stRtInfo);

    /**
     * 권한정보 삭제
     */
    void deleteStRtInfo(StRtInfo stRtInfo);

}
