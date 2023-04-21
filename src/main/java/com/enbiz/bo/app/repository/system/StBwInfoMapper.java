package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.BadWordMgmtRequest;
import com.enbiz.bo.app.dto.response.system.BadWordMgmtResponse;
import com.enbiz.bo.app.entity.StBwInfo;

@Repository
@Lazy
public interface StBwInfoMapper {

    /**
     * 금칙어 검색 목록 조회
     */
    List<BadWordMgmtResponse> getBadWordList(BadWordMgmtRequest BadWordMgmtRequest) throws Exception;

    /**
     * 금칙어 검색 조회수
     */
    int getBadWordListCount(BadWordMgmtRequest BadWordMgmtRequest);

    /**
     * 금칙어 중복 여부 조회
     * @param stBwInfo
     * @return
     */
    int getCountOfExistsStBwInfoByBwNm(StBwInfo stBwInfo);
}
