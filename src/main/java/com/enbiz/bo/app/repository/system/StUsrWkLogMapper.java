package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StUsrWkLogEx;

@Repository
@Lazy
public interface StUsrWkLogMapper {
    /**
     * 관리자 로그관리 페이지 - 관리자로그 Grid count 조회
     *
     * @param stUsrWkLogEx
     * @return
     * @throws Exception
     */
    int getAdminLogListCount(StUsrWkLogEx stUsrWkLogEx) throws Exception;

    /**
     * 관리자 로그관리 페이지 - 관리자로그 Grid 조회<br>
     *
     * @param stUsrWkLogEx
     * @return
     * @throws Exception
     */

    List<StUsrWkLogEx> getAdminLogList(StUsrWkLogEx stUsrWkLogEx) throws Exception;


}