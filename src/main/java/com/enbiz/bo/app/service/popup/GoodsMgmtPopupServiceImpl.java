package com.enbiz.bo.app.service.popup;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.GoodsPopupRequest;
import com.enbiz.bo.app.dto.response.popup.GoodsPopupResponse;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class GoodsMgmtPopupServiceImpl implements GoodsMgmtPopupService{

    private final PrGoodsBaseMapper prGoodsBaseMapper;

    @Override
    public int getGoodsListCount(GoodsPopupRequest goodsPopupRequest) throws Exception {
        return prGoodsBaseMapper.getPopupGoodsListCount(goodsPopupRequest);
    }

    @Override
    public List<GoodsPopupResponse> getGoodsList(GoodsPopupRequest goodsPopupRequest) throws Exception {
        return prGoodsBaseMapper.getPopupGoodsList(goodsPopupRequest);
    }
}
