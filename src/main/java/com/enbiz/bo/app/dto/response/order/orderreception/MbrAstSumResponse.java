package com.enbiz.bo.app.dto.response.order.orderreception;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("MbrAstSumResponse")
@Getter
@Setter
public class MbrAstSumResponse extends BaseCommonEntity{
    private String mbrNo;     //회원번호
    private String astGbCd;    //자산구분코드
    private Integer totAmt;   //총금액
    private Integer useAmt;   //사용금액
    private Integer posnAmt;  //보유금액
}
