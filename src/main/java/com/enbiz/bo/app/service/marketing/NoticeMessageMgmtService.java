package com.enbiz.bo.app.service.marketing;

import java.util.List;

import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoRequest;
import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoSaveRequest;
import com.enbiz.bo.app.dto.response.system.NoticeMessageInfoResponse;

/**
 * 알림메시지 관리 서비스
 */
public interface NoticeMessageMgmtService {
	
    /**
     * 알림메시지 목록 조회
     */
    List<NoticeMessageInfoResponse> getNoticeMessageList(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception;

    /**
     * 알림메시지 상세
     */
    List<NoticeMessageInfoResponse> getNoticeMessageInfo(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception;

    /**
     * 알림메시지 목록 count 조회
     */
    int getNoticeMessageListCount(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception;

    /**
     * 알림메시지 등록 수정
     */
    void saveNoticeMessageInfo(NoticeMessageInfoSaveRequest ccNotiMsgInfo) throws Exception;
}
