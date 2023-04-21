package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsObTypCdRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsObTypCdResponse;

@Repository
@Lazy
public interface CsObTypCdMapper {

    /**
     * OB유형 목록 조회
     * @return
     * @throws Exception
     */
    List<CsObTypCdResponse> getObTypeList(CsObTypCdRequest csObTypCdRequest) throws Exception;

    /**
     * OB유형 목록 조회 수
     * @return
     * @throws Exception
     */
    int getObTypeListCount(CsObTypCdRequest csObTypCdRequest) throws Exception;

    /**
     * OB유형명의 중복여부 확인
     * @return
     * @throws Exception
     */
    int checkObTypNm(CsObTypCdRequest csObTypCdRequest) throws Exception;

    /**
     * OB유형 NoPaging목록 조회
     * @return
     * @throws Exception
     */
    List<CsObTypCdResponse> getObTypeNoPagingList(CsObTypCdRequest csObTypCdRequest) throws Exception;
}
