package com.enbiz.bo.app.service.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.goods.PrGoodsRevInfoRequest;
import com.enbiz.bo.app.dto.response.goods.PrGoodsRevInfoResponse;
import com.enbiz.bo.app.repository.goods.PrGoodsRevInfoMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class DisplayGoodsReviewPopupServiceImpl implements DisplayGoodsReviewPopupService{

    private final PrGoodsRevInfoMapper prGoodsRevInfoMapper;

    /**
     * 전시대상 상품리뷰 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    public List<PrGoodsRevInfoResponse> getDisplayGoodsReviewList(PrGoodsRevInfoRequest request) throws Exception {
        return prGoodsRevInfoMapper.getDisplayGoodsReviewList(request);
    }

    /**
     *  전시대상 상품리뷰 목록 조회 수
     * @param request
     * @throws Exception
     */
    public int getDisplayGoodsReviewListCount(PrGoodsRevInfoRequest request) throws Exception {
        return prGoodsRevInfoMapper.getDisplayGoodsReviewListCount(request);
    }

}
