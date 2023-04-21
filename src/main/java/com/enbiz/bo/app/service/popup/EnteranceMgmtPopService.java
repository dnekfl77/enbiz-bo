package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.EnEntrBaseRequest;
import com.enbiz.bo.app.dto.response.popup.EnEntrBaseResponse;

/**
 * 협력사 관리 서비스
 */
public interface EnteranceMgmtPopService {

    /**
     * 협력사 목록 조회
     * @param  EnEntrBaseRequest
     * @return 협력사 목록
     * @throws Exception
     */
    List<EnEntrBaseResponse> getEtEntrBaseList(EnEntrBaseRequest etEntrBase) throws Exception;

    /**
     * 협력사 목록 수 조회
     * @param  EnEntrBaseRequest
     * @return 협력사 목록 수
     * @throws Exception
     */
    int getEtEntrBaseListCount(EnEntrBaseRequest etEntrBase) throws Exception;

}
