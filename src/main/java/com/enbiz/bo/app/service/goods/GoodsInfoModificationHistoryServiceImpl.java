package com.enbiz.bo.app.service.goods;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.GoodsInfoModificationHistoryRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsInfoModificationHistoryResponse;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseModLogMapper;

import java.util.List;

/**
 * 상품정보수정이력조회 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
public class GoodsInfoModificationHistoryServiceImpl implements GoodsInfoModificationHistoryService {

    private final PrGoodsBaseModLogMapper prGoodsBaseModLogMapper;
    private final PrGoodsBaseMapper prGoodsBaseMapper;

    @Override
    public int getGoodsInfoModificationHistoryListCount(GoodsInfoModificationHistoryRequest request) throws Exception {
        return prGoodsBaseModLogMapper.getGoodsBaseModLogListCount(request);
    }

    @Override
    public List<GoodsInfoModificationHistoryResponse> getGoodsInfoModificationHistoryList(GoodsInfoModificationHistoryRequest request) throws Exception {
        return prGoodsBaseModLogMapper.getGoodsBaseModLogList(request);
    }

    @Override
    public int getModifiedGoodsListCount(GoodsInfoModificationHistoryRequest request) throws Exception {
        return prGoodsBaseMapper.getModifiedGoodsListCount(request);
    }

    @Override
    public List<GoodsInfoModificationHistoryResponse> getModifiedGoodsList(GoodsInfoModificationHistoryRequest request) throws Exception {
        return prGoodsBaseMapper.getModifiedGoodsList(request);
    }
}
