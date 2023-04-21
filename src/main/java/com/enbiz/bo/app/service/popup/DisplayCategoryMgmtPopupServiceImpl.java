package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.repository.display.PrDispCtgBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 전시 카테고리 조회 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class DisplayCategoryMgmtPopupServiceImpl implements DisplayCategoryMgmtPopupService {

    private final PrDispCtgBaseMapper prDispCtgBaseMapper;

    @Override
    public List<PrDispCtgBaseResponse> getCcSiteBase() throws Exception {
        return prDispCtgBaseMapper.getCcSiteBase();
    }

    @Override
    public List<PrDispCtgBaseResponse> getDisplayCategoryList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        return prDispCtgBaseMapper.getDisplayCategoryList(prDispCtgBaseRequest);
    }

    @Override
    public int getDisplayCategoryListCount(PrDispCtgBaseRequest prDispCtgBaseRequest) {
        return prDispCtgBaseMapper.getDisplayCategoryListCount(prDispCtgBaseRequest);
    }

    @Override
    public List<PrDispCtgBaseResponse> getDisplayCategoryTreeList(PrDispCtgBaseRequest prDispCtgBaseRequest) throws Exception {
        return prDispCtgBaseMapper.getDisplayCategoryTreeList(prDispCtgBaseRequest);
    }
}
