package com.enbiz.bo.app.dto.request.goods;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.bo.app.entity.PrPregGoodsBase;
import com.enbiz.bo.app.entity.PrPregGoodsContInfo;

import lombok.Getter;
import lombok.Setter;

/**
 * 임시 묶음상품 Request
 */
@Getter
@Setter
@Alias("TemporaryPackageGoodsRequest")
public class TemporaryPackageGoodsRequest extends PrPregGoodsBase {

    private List<PrPregGoodsContInfo> prPregGoodsContInfoList              ;    // 가등록 상품컨텐츠정보 목록

}
