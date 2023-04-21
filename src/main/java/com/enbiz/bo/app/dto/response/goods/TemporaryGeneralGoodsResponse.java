package com.enbiz.bo.app.dto.response.goods;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrPregAdveWrdHist;
import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsContInfo;
import com.enbiz.bo.app.entity.PrPregGoodsItemInfo;
import com.enbiz.bo.app.entity.PrPregGoodsPayMeanInfo;
import com.enbiz.bo.app.entity.PrPregGoodsPrcHist;
import com.enbiz.bo.app.entity.PrPregGoodsSafeCertiHist;
import com.enbiz.bo.app.entity.PrPregItmBase;
import com.enbiz.bo.app.entity.PrPregItmOptnInfo;
import com.enbiz.bo.app.entity.PrPregPrestHist;
import com.enbiz.bo.app.entity.PrPregRsvSaleHist;

import lombok.Getter;
import lombok.Setter;

/**
 * 임시 일반상품 Response
 */
@Getter
@Setter
@Alias("TemporaryGeneralGoodsResponse")
public class TemporaryGeneralGoodsResponse extends PrPregGoodsBase {

    private String entrNm                                                  ;    // 협력사명
    private String stdCtgHierarchy                                         ;    // 표준분류하이라키구조
    private String mdId                                                    ;    // MD아이디
    private String brandNm                                                 ;    // 브랜드명
    private String goodsNotiLisartCd                                       ;    // 상품고시품목코드

    private PrPregRsvSaleHist prPregRsvSaleHist                            ;    // 가등록 예약판매이력
    private PrPregGoodsPrcHist prPregGoodsPrcHist                          ;    // 가등록 상품가격이력

    private List<PrPregGoodsItemInfo> prPregGoodsItemInfoList              ;    // 가등록 상품항목정보 목록
    private List<PrPregGoodsSafeCertiHist> prPregGoodsSafeCertiHistList    ;    // 가등록 상품안전인증이력 목록

    private List<PrPregGoodsPayMeanInfo> prPregGoodsPayMeanInfoList        ;    // 가등록 상품결제수단정보 목록

    private List<PrPregItmOptnInfo> prPregItmOptnInfoList                  ;    // 가등록 단품옵션정보 목록
    private List<PrPregItmBase> prPregItmBaseList                          ;    // 가등록 단품기본 목록

    private List<StandardCategoryDisplayResponse> prStdCtgDispInfoList     ;    // 표준카테고리전시정보 목록
    private List<TemporaryAssociatedGoodsResponse> prPregAssocGoodsInfoList          ;    // 가등록 연계상품정보 목록
    private List<PrPregAdveWrdHist> prPregAdveWrdHistList                  ;    // 가등록 상품홍보문구이력 목록
    private List<PrPregPrestHist> prPregPrestHistList                      ;    // 가등록 증정품이력 목록

    private List<PrPregGoodsContInfo> prPregGoodsContInfoList              ;    // 가등록 상품컨텐츠정보 목록

}
