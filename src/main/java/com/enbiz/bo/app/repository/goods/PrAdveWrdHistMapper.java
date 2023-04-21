package com.enbiz.bo.app.repository.goods;

import java.util.List;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.AdvertisingWordMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.AdvertisingWordMgmtResponse;
import com.enbiz.bo.app.entity.PrAdveWrdHist;

/**
 * 상품홍보문구이력 DAO
 */
@Repository
@Lazy
public interface PrAdveWrdHistMapper {

    /**
     * 홍보문구관리 > 홍보문구 목록 조회
     * @return GoodsItemListResponse
     */
    List<AdvertisingWordMgmtResponse> getPrAdveWrdHistList(AdvertisingWordMgmtRequest request);

    /**
     * 홍보문구관리 > 홍보문구 목록 수 조회
     * @param request
     * @return
     */
    int getPrAdveWrdHistListCount(AdvertisingWordMgmtRequest request);

    /**
     * 홍보문구관리 > 홍보문구 적용기간 중복여부 확인
     * @param prAdveWrdHist
     * @return
     * @throws Exception
     */
    boolean checkDuplicatedAdveWrdAplyDt(PrAdveWrdHist prAdveWrdHist) throws Exception;

    /**
     * 일반상품 상세 > 홍보문구 목록 조회
     * @param goodsNo
     * @return
     */
    List<PrAdveWrdHist> getAdvertisingWordList(String goodsNo);

}
