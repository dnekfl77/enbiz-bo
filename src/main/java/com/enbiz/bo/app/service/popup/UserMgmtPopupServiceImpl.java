package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.StUserBaseRequest;
import com.enbiz.bo.app.dto.response.popup.StUserBaseResponse;
import com.enbiz.bo.app.repository.system.StUserBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사용자 관리 서비스 IMPL
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class UserMgmtPopupServiceImpl implements UserMgmtPopupService {

    private final StUserBaseMapper stUserBaseMapper;

    @Override
    public int getUserListCount(StUserBaseRequest stUserBaseRequest) throws Exception {
        return stUserBaseMapper.getUserListCount(stUserBaseRequest);
    }

    @Override
    public List<StUserBaseResponse> getUserList(StUserBaseRequest stUserBaseRequest) throws Exception {
        return stUserBaseMapper.getUserList(stUserBaseRequest);
    }

    @Override
    public List<StUserBaseResponse> getUserListNoPage(StUserBaseRequest stUserBaseRequest) throws Exception{
        return stUserBaseMapper.getUserListNoPage(stUserBaseRequest);
    }
}
