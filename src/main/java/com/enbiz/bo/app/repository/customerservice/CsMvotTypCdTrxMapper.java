package com.enbiz.bo.app.repository.customerservice;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.customerservice.CsMvotTypeCodeRequest;
import com.enbiz.bo.app.dto.response.customerservice.CsTransferTypeCodeResponse;
import com.enbiz.bo.app.entity.CsMvotTypCd;

@Repository
@Lazy
public interface CsMvotTypCdTrxMapper {

    /**
     * CS 이관유형코드 조회
     */
    List<CsTransferTypeCodeResponse> getCsMvotTypCdList();
    
    /*
     * 이관유형 목록 조회
     * @return
     * @throws Exception
     */
    List<CsTransferTypeCodeResponse> getTransferTypeList(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception;

    /**
     * 이관유형 목록 조회 수
     * @return
     * @throws Exception
     */
    int getTransferTypeListCount(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception;

    /**
     * 이관유형 등록
     * @return
     * @throws Exception
     */
    void insertCsMvotTypCd(CsMvotTypCd csMvotTypCd) throws Exception;

    /**
     * 이관유형 업데이트
     * @return
     * @throws Exception
     */
    void updateCsMvotTypCd(CsMvotTypCd csMvotTypCd) throws Exception;

    /**
     * 이관유형명의 중복여부 확인
     * @return
     * @throws Exception
     */
    int checkCsMvotTypNm(CsMvotTypeCodeRequest CsMvotTypeCodeRequest) throws Exception;

}
