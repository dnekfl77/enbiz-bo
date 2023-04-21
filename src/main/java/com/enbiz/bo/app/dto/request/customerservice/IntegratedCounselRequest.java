package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("IntegratedCounselRequest")
@Getter
@Setter
public class IntegratedCounselRequest extends BaseCommonEntity {
    private String periodType;      // 기간 검색 종류
    private String startDate;       // 시작 기간
    private String endDate;         // 종료 기간
    private String custCnslGbCd;    // 상담구분
    private String accpTypCd;       // 접수유형
    private String cnslLrgTypNo;    // 상담유형대
    private String cnslMidTypNo;    // 상담유형중
    private String cnslTypNo;       // 상담유형소
    private String ccnPrgsStatCd;   // 처리상태
    private String goodsNo;         // 상품번호

    private String noSelectType;    // 회원/주문/상담번호 타입
    private String noText;          // 회원/주문/상담번호 입력값
    private String idSelectType;    // 접수자/처리자 타입
    private String userId;          // 담당자
}
