package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;
import com.enbiz.bo.app.repository.goods.PrBrandMstMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 브랜드 팝업 관리 서비스 IMPL
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true) 
public class BrandMgmtPopupServiceImpl implements BrandMgmtPopupService {

    private final PrBrandMstMapper prBrandMstMapper;

    @Override
    public int getBrandListCount(PrBrandMstRequest prBrandMstRequest) throws Exception {
        return prBrandMstMapper.getBrandListCount(prBrandMstRequest);
    }

    @Override
    public List<PrBrandMstResponse> getBrandList(PrBrandMstRequest prBrandMstRequest) throws Exception {
        return prBrandMstMapper.getBrandList(prBrandMstRequest);
    }
}
