package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.CcChlBaseRequest;
import com.enbiz.bo.app.dto.response.popup.CcChlBaseResponse;
import com.enbiz.bo.app.repository.display.CcChlBaseMapper;

import lombok.RequiredArgsConstructor;

/**
 * 채널 조회 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class ChannelMgmtPopupServiceImpl implements ChannelMgmtPopupService {

    private final CcChlBaseMapper ccChlBaseMapper;

    @Override
    public List<CcChlBaseResponse> getChannelList(CcChlBaseRequest ccChlBaseRequest) throws Exception {
        return ccChlBaseMapper.getChannelList(ccChlBaseRequest);
    }

    @Override
    public int getChannelListCount(CcChlBaseRequest ccChlBaseRequest) {
        return ccChlBaseMapper.getChannelListCount(ccChlBaseRequest);
    }
}
