package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.StZipNoPopupRequest;
import com.enbiz.bo.app.dto.response.popup.StZipNoPopupResponse;
import com.enbiz.bo.app.repository.system.StZipNoMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 우편번호 팝업 서비스 Impl
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class ZipCodeMgmtPopupServiceImpl implements ZipCodeMgmtPopupService{

    private final StZipNoMapper stZipNoMapper;

    @Override
    public List<StZipNoPopupResponse> getZipNoPopupList(StZipNoPopupRequest req) {
        return stZipNoMapper.getZipNoPopupList(req);
    }

    @Override
    public int getZipNoPopupListCount(StZipNoPopupRequest req) {
        return stZipNoMapper.getZipNoPopupListCount(req);
    }
}
