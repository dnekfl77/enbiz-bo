package com.enbiz.bo.app.service.popup;

import java.util.List;

import com.enbiz.bo.app.dto.request.popup.CcChlBaseRequest;
import com.enbiz.bo.app.dto.response.popup.CcChlBaseResponse;

/**
 *  채널 관리 서비스
 */
public interface ChannelMgmtPopupService {

    /**
     * 채널 목록 조회
     * @param  ccChlBaseRequest
     * @return 전시 카테고리 목록
     * @throws Exception
     */
    List<CcChlBaseResponse> getChannelList(CcChlBaseRequest ccChlBaseRequest) throws Exception;

    /**
     * 채널 목록 수 조회
     * @param  ccChlBaseRequest
     * @return 전시 카테고리 목록 수
     * @throws Exception
     */
    int getChannelListCount(CcChlBaseRequest ccChlBaseRequest) throws Exception;

}
