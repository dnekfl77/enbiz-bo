package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("GoodsPriceHistoryResponse")
@Getter
@Setter
public class GoodsPriceHistoryResponse extends BaseCommonEntity {

    private String histStrDtm        ;  // 적용시작일자
    private String histEndDtm        ;  // 적용종료일자
    private Integer supPcost         ;  // 공급가
    private Integer norPrc           ;  // 정상가
    private Integer salePrc          ;  // 판매가
    private Float mrgnRate           ;  // 마진율
    private String prcChgCausCd      ;  // 가격변경사유코드
    private String prcChgCausCdNm    ;  // 가격변경사유코드명

}
