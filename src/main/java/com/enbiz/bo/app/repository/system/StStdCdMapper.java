package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;
import com.enbiz.bo.app.entity.StStdCd;

@Repository
@Lazy
public interface StStdCdMapper {
	 /**
     * 기준코드 목록 조회
     * @param  StandardCodeRequest
     * @return 기준코드 목록
     * @throws Exception
     */
    List<StandardCodeResponse> getStStdCdList(StandardCodeRequest StandardCodeRequest);

    /**
     * 기준코드 목록 건수
     * @param  StandardCodeRequest
     * @return 기준코드 목록 건수
     * @throws Exception
     */
    int getStStdCdListCount(StandardCodeRequest StandardCodeRequest);

    /**
     * 공통코드 목록 조회
     * @param param
     * @return
     */
    List<StStdCd> getStStdCd(String[] param);

    /**
     * 기준코드 중복여부 확인
     * @param StandardCodeRequest
     * @return
     */
    Integer getCdCheck(StandardCodeRequest StandardCodeRequest);

    /**
     * 기준코드명 중복여부 확인
     * @param StandardCodeRequest
     * @return
     */
    Integer getCdNmCheck(StandardCodeRequest StandardCodeRequest);


}
