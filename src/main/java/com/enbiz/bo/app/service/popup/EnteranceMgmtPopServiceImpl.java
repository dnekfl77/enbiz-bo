package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.EnEntrBaseRequest;
import com.enbiz.bo.app.dto.response.popup.EnEntrBaseResponse;
import com.enbiz.bo.app.repository.vendor.EtEntrBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 협력사 관리 서비스 Impl
 */
@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class EnteranceMgmtPopServiceImpl implements EnteranceMgmtPopService {

    private final EtEntrBaseMapper etEntrBaseMapper;

    @Override
    public List<EnEntrBaseResponse> getEtEntrBaseList(EnEntrBaseRequest etEntrBase) throws Exception {
        return etEntrBaseMapper.getEtEntrBaseList(etEntrBase);
    }

    @Override
    public int getEtEntrBaseListCount(EnEntrBaseRequest etEntrBase) throws Exception {
        return etEntrBaseMapper.getEtEntrBaseListCount(etEntrBase);
    }
}
