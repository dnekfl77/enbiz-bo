package com.enbiz.bo.app.dto.response.goods;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrAdveWrdHist;
import com.enbiz.bo.app.entity.PrGoodsItemInfo;
import com.enbiz.bo.app.entity.PrGoodsPayMeanInfo;
import com.enbiz.bo.app.entity.PrGoodsPrcHist;
import com.enbiz.bo.app.entity.PrGoodsSafeCertiHist;
import com.enbiz.bo.app.entity.PrItmBase;
import com.enbiz.bo.app.entity.PrPrestHist;
import com.enbiz.bo.app.entity.PrRsvSaleHist;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 일반 상품 상세 Response
 */
@Getter
@Setter
@Alias("GeneralGoodsResponse")
public class GeneralGoodsResponse extends BaseCommonEntity {

    private GoodsBaseResponse prGoodsBase                               ; // 상품기본
    private PrRsvSaleHist prRsvSaleHist                                 ; // 예약판매이력
    private List<PrGoodsItemInfo> prGoodsItemInfoList                   ; // 상품항목정보 목록
    private List<PrGoodsSafeCertiHist> prGoodsSafeCertiHistList         ; // 상품안전인증이력
    private PrGoodsPrcHist prGoodsPrcHist                               ; // 상품가격이력
    private List<PrGoodsPayMeanInfo> prGoodsPayMeanInfoList             ; // 상품결제수단정보 목록
    private List<PrItmBase> prItmBaseList                               ; // 단품 목록
    private List<StandardCategoryDisplayResponse> prStdCtgDispInfoList  ; // 표준카테고리전시정보 목록
    private List<AssociatedGoodsResponse> prAssocGoodsInfoList          ; // 연관상품 목록
    private List<PrAdveWrdHist> prAdveWrdHistList                       ; // 홍보문구 목록
    private List<PrPrestHist> prPrestHistList                           ; // 증정품 목록

}
