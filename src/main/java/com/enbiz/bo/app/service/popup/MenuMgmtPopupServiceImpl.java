package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.StRtTgtMenuRequest;
import com.enbiz.bo.app.dto.response.popup.StRtTgtMenuResponse;
import com.enbiz.bo.app.repository.system.StRtTgtBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 권한대상 관리
 * munu , 화면 , Request , 버튼
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class MenuMgmtPopupServiceImpl implements MenuMgmtPopupService {

    private final StRtTgtBaseMapper stRtTgtBaseMapper;

    @Override
    public List<StRtTgtMenuResponse> getMenuList(StRtTgtMenuRequest stRtTgtMenuRequest) {
        return stRtTgtBaseMapper.getMenuList(stRtTgtMenuRequest);
    }
}
