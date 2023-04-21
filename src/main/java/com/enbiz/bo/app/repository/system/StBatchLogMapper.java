package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StBatchLogEx;
import com.enbiz.bo.app.entity.StLinkLogEx;

@Repository
@Lazy
public interface StBatchLogMapper {
    /**
     * 배치/연동 로그관리 페이지 - 배치로그 Grid count 조회
     *
     * @param stBatchLogEx
     * @return
     * @throws Exception
     */
    int getBatchLogListCount(StBatchLogEx stBatchLogEx) throws Exception;

    /**
     * 배치/연동 로그관리 페이지 - 배치로그 Grid 조회<br>
     *
     * @param stBatchLogEx
     * @return
     * @throws Exception
     */
    List<StBatchLogEx> getBatchLogList(StBatchLogEx stBatchLogEx) throws Exception;

    /**
     * 배치/연동 로그관리 페이지 - 연동로그 Grid count 조회
     *
     * @param stBatchLogEx
     * @return
     * @throws Exception
     */
    int getInterLockingLogListCount(StLinkLogEx stLinkLogEx) throws Exception;

    /**
     * 배치/연동 로그관리 페이지 - 연동로그 Grid 조회<br>
     *
     * @param stBatchLogEx
     * @return
     * @throws Exception
     */
    List<StLinkLogEx> getInterLockingLogList(StLinkLogEx stLinkLogEx) throws Exception;


}