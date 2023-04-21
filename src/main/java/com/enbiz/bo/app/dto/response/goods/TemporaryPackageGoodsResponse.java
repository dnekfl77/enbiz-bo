package com.enbiz.bo.app.dto.response.goods;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsContInfo;

import lombok.Getter;
import lombok.Setter;

/**
 * 임시 묶음상품 Response
 */
@Getter
@Setter
@Alias("TemporaryPackageGoodsResponse")
public class TemporaryPackageGoodsResponse extends PrPregGoodsBase {

    private String entrNm                                                  ;    // 협력사명
    private String stdCtgHierarchy                                         ;    // 표준분류하이라키구조
    private String mdId                                                    ;    // MD아이디
    private String brandNm                                                 ;    // 브랜드명
    private String goodsNotiLisartCd                                       ;    // 상품고시품목코드

    private List<PrPregGoodsContInfo> prPregGoodsContInfoList              ;    // 가등록 상품컨텐츠정보 목록
    private List<TemporaryRelatedGoodsResponse> prPregRelGoodsInfoList              ;    // 가등록 관계상품정보 목록

}
