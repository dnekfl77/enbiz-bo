package com.enbiz.bo.app.repository.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoRequest;
import com.enbiz.bo.app.dto.response.system.NoticeMessageInfoResponse;

@Repository
@Lazy
public interface CcNotiMsgInfoMapper {

    /**
     * 알림 메시지 리스트 조회
     * @param NoticeMessageInfoRequest
     * @return List<NoticeMessageInfoResponse>
     */
    List<NoticeMessageInfoResponse> getNoticeMessageList(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception;

    /**
     * 알림 메시지 상세
     * @param NoticeMessageInfoRequest
     * @return NoticeMessageInfoResponse
     */
    List<NoticeMessageInfoResponse> getNoticeMessageInfo(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception;

    /**
     * 일림 메시지 리스트 카운트
     * @param NoticeMessageInfoRequest
     * @return int
     */
    int getNoticeMessageListCount(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception;


}
