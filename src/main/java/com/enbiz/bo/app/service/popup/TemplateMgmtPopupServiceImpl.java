package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrTmplBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.repository.display.PrTmplBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 템플릿 조회 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class TemplateMgmtPopupServiceImpl implements TemplateMgmtPopupService {

    private final PrTmplBaseMapper prTmplBaseMapper;

    @Override
    public List<PrTmplBaseResponse> getTemplateList(PrTmplBaseRequest prTmplBaseRequest) throws Exception {
        return prTmplBaseMapper.getTemplateList(prTmplBaseRequest);
    }

    @Override
    public int getTemplateListCount(PrTmplBaseRequest prTmplBaseRequest) {
        return prTmplBaseMapper.getTemplateListCount(prTmplBaseRequest);
    }
}
