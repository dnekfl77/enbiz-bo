package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.annotation.EmptyToNull;
import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 가등록 상품 기본
 */
@Alias("PrPregGoodsBase")
@Getter
@Setter
public class PrPregGoodsBase extends BaseCommonEntity {

    private String pregGoodsNo                   ; // 가등록상품번호
    private String goodsNm                       ; // 상품명
    private String shrtGoodsNm                   ; // 단축상품명
    @EmptyToNull
    private String lgcGoodsNo                    ; // 기간계상품번호
    private String entrNo                        ; // 협력사번호
    private String stdCtgNo                      ; // 표준카테고리번호
    @EmptyToNull
    private String goodsNo                       ; // 상품번호
    private String regInfPathCd                  ; // 등록유입경로코드(PR029)
    private String pregStatCd                    ; // 가등록상태코드(PR024)
    @EmptyToNull
    private String aprvReqDt                     ; // 승인요청일자
    @EmptyToNull
    private String aprvDt                        ; // 승인일자
    @EmptyToNull
    private String retnCaus                      ; // 반려사유
    @EmptyToNull
    private String retnDt                        ; // 반려일자
    @EmptyToNull
    private String retnCausCd                    ; // 반려사유코드(PR042)
    private String saleMethCd                    ; // 판매방식코드(PR003)
    private String goodsCompCd                   ; // 상품구성코드(PR001)
    private String goodsTypCd                    ; // 상품유형코드(PR002)
    @EmptyToNull
    private String brandNo                       ; // 브랜드번호
    @EmptyToNull
    private String modlNm                        ; // 모델명
    @EmptyToNull
    private String homeNm                        ; // 원산지명
    @EmptyToNull
    private String mfcoNm                        ; // 제조사명
    @EmptyToNull
    private String incomNm                       ; // 수입자명
    @EmptyToNull
    private String salemnNm                      ; // 판매자명
    private String safeCertiTgtYn                ; // 안전인증대상여부
    private String buyrAgeLmtCd                  ; // 구입자나이제한코드(PR004)
    private String dispYn                        ; // 전시여부
    private String goodsRegDtm                   ; // 상품등록일시
    private String saleStrDtm                    ; // 판매시작일시
    private String saleEndDtm                    ; // 판매종료일시
    private String buyTypCd                      ; // 매입형태코드(PR006)
    private String taxGbCd                       ; // 과면세구분코드(PR007)
    private String stkMgrYn                      ; // 재고관리여부
    private String buyQtyLmtYn                   ; // 구매수량제한여부
    private Integer minLmtQty                    ; // 최소제한수량
    private Integer maxLmtQty                    ; // 최대제한수량
    private String deliProcTypCd                 ; // 배송처리유형코드(PR008)
    private String deliGoodsGbCd                 ; // 배송상품구분코드(PR010)
    private String deliWayCd                     ; // 배송수단코드(PR009)
    private Integer deliDday                     ; // 배송기일
    private String tdaySndPsbYn                  ; // 당일발송가능여부
    @EmptyToNull
    private String wdSndPsbTm                    ; // 평일발송가능시간
    private String sdaySndPsbYn                  ; // 툐요일발송가능여부
    @EmptyToNull
    private String sdaySndPsbTm                  ; // 토요일발송가능시간
    private String itmSoutNotiYn                 ; // 단품품절알림여부
    private String deliPolcNo                    ; // 배송정책번호
    private String bdlDeliPsbYn                  ; // 묶음배송가능여부
    private String bdlRtnPsbYn                   ; // 묶음반품가능여부
    private String rtnPsbYn                      ; // 반품가능여부
    private String exchPsbYn                     ; // 교환가능여부
    private String prcCompaExpYn                 ; // 가격비교노출여부
    private String schPsbYn                      ; // 검색가능여부
    @EmptyToNull
    private String schKwd1Nm                     ; // 검색키워드1명
    @EmptyToNull
    private String schKwd2Nm                     ; // 검색키워드2명
    @EmptyToNull
    private String schKwd3Nm                     ; // 검색키워드3명
    private String pkgGoodsPrioRnkCd             ; // 묶음상품우선순위코드(PR035)
}
