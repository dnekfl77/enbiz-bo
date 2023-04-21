package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponCostResponse")
@Getter
@Setter
public class CouponCostResponse extends BaseCommonEntity {
    private String cpnNo;           //쿠폰번호
    private String useDtm;          //사용일자
    private String promoTypCd;      //쿠폰유형
    private String promoTypNm;      //쿠폰유형
    private String promoNm;         //쿠폰명
    private Integer isuCnt;         //발급건수
    private Integer useCnt;         //사용건수
    private Integer cnclCnt;        //취소건수
    private Integer ordAmt;         //총 상품금액
    private Integer cpnAmt;         //쿠폰비용
    private Double useRt;           //사용율
    private String fixamtFxrtGbCd;  //정액/정률구분
    private String fixamtFxrtGbNm;  //정액/정률구분
    private String dcRateAmt;       //할인금액
    private String sysModId;        //수정자
    private String sysModDtm;       //수정일자
}
