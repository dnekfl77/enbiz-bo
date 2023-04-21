package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 임시 상품 상품고시항목 Request
 */
@Getter
@Setter
@Alias("GoodsNotificationItemRequest")
public class GoodsNotificationItemRequest extends BaseCommonEntity {

    private String goodsNotiLisartCd   ;    // 상품고시품목코드
    private String safeCertiNeedYn     ;    // 안전인증필요여부
}
