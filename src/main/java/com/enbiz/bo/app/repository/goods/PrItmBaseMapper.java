package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsItemMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsItemMgmtResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsItemSaleStatusResponse;
import com.enbiz.bo.app.entity.PrItmBase;

/**
 * 단품기본 DAO
 */
@Repository
@Lazy
public interface PrItmBaseMapper {

    /**
     * 단품 관리 > 단품 목록 조회
     * @return GoodsItemListResponse
     * @throws Exception
     */
    List<GoodsItemMgmtResponse> getGoodsItemList(GoodsItemMgmtRequest request);

    /**
     * 단품 관리 > 단품 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getGoodsItemListCount(GoodsItemMgmtRequest request);


    /**
     * 단품관리 > 단품 상태 조회
     * @param goodsNo
     * @return
     */
    List<GoodsItemSaleStatusResponse> getGoodsItemSaleStatus(String goodsNo);

    /**
     * 일반상품 상세 > 단품 목록 조회
     * @param goodsNo
     * @return
     */
    List<PrItmBase> getGoodsItemBaseList(String goodsNo);

    /**
     * 일반상품 상세 > 단품 정보 조회
     * @param prItmBase
     * @return
     */
    PrItmBase getPrItmBaseInfo(PrItmBase prItmBase);

}
