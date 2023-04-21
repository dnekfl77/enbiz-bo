package com.enbiz.bo.app.service.marketing;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoRequest;
import com.enbiz.bo.app.dto.request.system.NoticeMessageInfoSaveRequest;
import com.enbiz.bo.app.dto.response.system.NoticeMessageInfoResponse;
import com.enbiz.bo.app.repository.system.CcNotiMsgInfoMapper;
import com.enbiz.bo.app.repository.system.CcNotiMsgInfoTrxMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class NoticeMessageMgmtServiceImpl implements NoticeMessageMgmtService {

    private final CcNotiMsgInfoMapper ccNotiMsgInfoMapper;
    private final CcNotiMsgInfoTrxMapper ccNotiMsgInfoTrxMapper;

    @Override
    public List<NoticeMessageInfoResponse> getNoticeMessageList(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception {
        return ccNotiMsgInfoMapper.getNoticeMessageList(NoticeMessageInfoRequest);
    }

    @Override
    public List<NoticeMessageInfoResponse> getNoticeMessageInfo(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception {
        return ccNotiMsgInfoMapper.getNoticeMessageInfo(NoticeMessageInfoRequest);
    }

    @Override
    public int getNoticeMessageListCount(NoticeMessageInfoRequest NoticeMessageInfoRequest) throws Exception {
        return ccNotiMsgInfoMapper.getNoticeMessageListCount(NoticeMessageInfoRequest);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveNoticeMessageInfo(NoticeMessageInfoSaveRequest ccNotiMsgInfo) throws Exception {
        if(ccNotiMsgInfo != null && !StringUtils.isEmpty(ccNotiMsgInfo.getNotiMsgSeq()) ) {
            ccNotiMsgInfoTrxMapper.updateNoticeMessageInfo(ccNotiMsgInfo);
        } else {
            ccNotiMsgInfoTrxMapper.insertNoticeMessageInfo(ccNotiMsgInfo);
        }
    }
}
