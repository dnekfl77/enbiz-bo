package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품승인관리 Request
 */
@Alias("GoodsApprovalMgmtRequest")
@Getter
@Setter
public class GoodsApprovalMgmtRequest extends BaseCommonEntity {

    // 검색조건
    private String aprvReqStartDt         ;     // 승인요청시작일시
    private String aprvReqEndDt           ;     // 승인요청종료일시
    private String pregStatCd             ;     // 가등록상태코드(PR024)
    private String goodsCompCd            ;     // 상품구성코드(PR001)
    private String goodsTypCd             ;     // 상품유형코드(PR002)
    private String saleMethCd             ;     // 판매방식코드(PR003)
    private String buyTypCd               ;     // 매입형태코드(PR006)
    private String mdId                   ;     // 담당MD
    private String entrNo                 ;     // 협력사번호
    private String goodsNm                ;     // 상품명
    private String[] pregGoodsNoList      ;     // 가등록상품번호목록

    // 반려사유등록
    private String pregGoodsNo            ;     // 가등록상품번호
    private String retnCaus               ;     // 반려사유
    private String retnCausCd             ;     // 반려사유코드(PR042)

}
