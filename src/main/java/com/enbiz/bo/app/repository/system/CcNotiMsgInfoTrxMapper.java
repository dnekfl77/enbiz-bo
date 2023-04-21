package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoSaveRequest;

@Repository
@Lazy
public interface CcNotiMsgInfoTrxMapper {

    /**
     * 알림 메시지 등록
     * @param NoticeMessageInfoRequest
     * @return int
     */
    int insertNoticeMessageInfo(NoticeMessageInfoSaveRequest ccNotiMsgInfo) throws Exception;

    /**
     * 알림 메시지 수정
     * @param NoticeMessageInfoRequest
     * @return int
     */
    int updateNoticeMessageInfo(NoticeMessageInfoSaveRequest ccNotiMsgInfo) throws Exception;


}
