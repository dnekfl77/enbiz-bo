package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("OtOneInquiryRequest")
@Getter
@Setter
public class OtOneInquiryRequest extends BaseCommonEntity {
    private String ccnNo;           // 상담번호
    private String ccnPrgsStatCd;   // 고객상담진행상태코드
    private String preProcYn;       // 기처리여부
    private String ansCont;         // 답변내용
}
