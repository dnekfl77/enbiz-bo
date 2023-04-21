package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품정보수정이력조회 Request DTO
 */
@Alias("GoodsInfoModificationHistoryRequest")
@Getter
@Setter
public class GoodsInfoModificationHistoryRequest extends BaseCommonEntity {

    private String modStartDtm         ; // 수정시작일시
    private String modEndDtm           ; // 수정종료일시
    private String goodsModItemCd      ; // 상품수정항목코드
    private String goodsNo             ; // 상품번호
    private String goodsNm             ; // 상품명

}
