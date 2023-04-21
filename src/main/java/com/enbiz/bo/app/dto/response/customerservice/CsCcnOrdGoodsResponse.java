package com.enbiz.bo.app.dto.response.customerservice;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCcnOrdGoodsResponse")
@Getter
@Setter
public class CsCcnOrdGoodsResponse extends BaseCommonEntity {
    private String ccnNo;
    private String custCnslSeq;
    private String ordNo;
    private String goodsNo;
    private CsCcnGoodsResponse csCcnGoodsResponse;
    private List<CsCcnOrdResponse> csCcnOrdResponses;
}
