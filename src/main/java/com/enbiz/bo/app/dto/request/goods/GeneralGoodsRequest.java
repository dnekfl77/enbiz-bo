package com.enbiz.bo.app.dto.request.goods;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrAdveWrdHist;
import com.enbiz.bo.app.entity.PrGoodsBase;
import com.enbiz.bo.app.entity.PrGoodsItemInfo;
import com.enbiz.bo.app.entity.PrGoodsPayMeanInfo;
import com.enbiz.bo.app.entity.PrGoodsSafeCertiHist;
import com.enbiz.bo.app.entity.PrPrestHist;
import com.enbiz.bo.app.entity.PrRsvSaleHist;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 일반상품 상세 Request
 */
@Getter
@Setter
@Alias("GeneralGoodsRequest")
public class GeneralGoodsRequest extends BaseCommonEntity {

    private PrGoodsBase prGoodsBase                              ; // 상품기본
    private PrRsvSaleHist prRsvSaleHist                          ; // 예약판매이력
    private List<PrGoodsItemInfo> prGoodsItemInfoList            ; // 상품항목정보 목록
    private List<PrGoodsSafeCertiHist> prGoodsSafeCertiHistList  ; // 상품안전인증이력
    private List<PrGoodsPayMeanInfo> prGoodsPayMeanInfoList      ; // 상품결제수단정보 목록
    private List<PrAdveWrdHist> prAdveWrdHistList                ; // 홍보문구 목록
    private List<PrPrestHist> prPrestHistList                    ; // 증정품 목록

}
