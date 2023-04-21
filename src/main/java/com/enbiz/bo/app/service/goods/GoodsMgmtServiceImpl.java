package com.enbiz.bo.app.service.goods;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.GoodsMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsMgmtResponse;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseMapper;

import lombok.RequiredArgsConstructor;

/**
 * 상품관리 ServiceImpl
 */
@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class GoodsMgmtServiceImpl implements GoodsMgmtService {

    private final PrGoodsBaseMapper prGoodsBaseMapper;

    @Override
    public int getGoodsListCount(GoodsMgmtRequest request) throws Exception {
        return prGoodsBaseMapper.getGoodsListCount(request);
    }

    @Override
    public List<GoodsMgmtResponse> getGoodsList(GoodsMgmtRequest request) throws Exception {
        return prGoodsBaseMapper.getGoodsList(request);
    }
}
