package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품승인관리 Response
 */
@Alias("GoodsApprovalMgmtResponse")
@Getter
@Setter
public class GoodsApprovalMgmtResponse extends BaseCommonEntity {

    private String pregStatCd       ;               // 승인상태코드(PR024)
    private String pregStatCdNm     ;               // 승인상태코드명

    private String retnCaus         ;               // 반려사유
    private String retnDt           ;               // 반려일자
    private String retnCausCdNm     ;               // 반려사유코드명(PR042)

    private String goodsCompCd      ;               // 상품구성코드(PR001)
    private String goodsCompCdNm    ;               // 상품구성코드명
    private String goodsTypCdNm     ;               // 상품유형코드명(PR002)
    private String saleMethCdNm     ;               // 판매방식코드명(PR003)

    private String mdNm             ;               // 담당MD명
    private String pregGoodsNo      ;               // 임시상품번호
    private String goodsNm          ;               // 상품명
    private String modlNm           ;               // 모델명
    private String taxGbCdNm        ;               // 과/면세구분코드명(PR007)
    private String buyTypCdNm       ;               // 매입형태코드명(PR006)
    private Integer norPrc          ;               // 정상가
    private Integer salePrc         ;               // 판매가
    private Float mrgnRate          ;               // 마진율
    private String entrNm           ;               // 협력사명
    private String brandNm          ;               // 브랜드명
    private String deliProcTypCdNm  ;               // 배송처리유형코드명(PR008)
    private String aprvDt           ;               // 승인일자

}
