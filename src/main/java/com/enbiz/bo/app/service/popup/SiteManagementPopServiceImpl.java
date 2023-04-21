package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.response.popup.CcSitePopupResponse;
import com.enbiz.bo.app.repository.display.CcSiteBaseMapper;

import lombok.RequiredArgsConstructor;

/**
 * 사이트 팝업 Impl
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class SiteManagementPopServiceImpl implements SiteManagementPopService{

    private final CcSiteBaseMapper ccSiteBaseMapper;

    @Override
    public List<CcSitePopupResponse> getSitePopupList() throws Exception{
        return ccSiteBaseMapper.getSitePopupList();
    }

}
