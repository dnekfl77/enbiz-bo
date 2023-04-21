package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품임시저장관리 Request
 */
@Alias("GoodsTemporarySaveMgmtRequest")
@Getter
@Setter
public class GoodsTemporarySaveMgmtRequest extends BaseCommonEntity {

    private String goodsRegStartDtm       ;     // 상품등록시작일시
    private String goodsRegEndDtm         ;     // 상품등록종료일시
    private String pregStatCd             ;     // 가등록상태코드(PR024)
    private String goodsCompCd            ;     // 상품구성코드(PR001)
    private String saleMethCd             ;     // 판매방식코드(PR003)
    private String goodsTypCd             ;     // 상품유형코드(PR002)
    private String buyTypCd               ;     // 매입형태코드(PR006)
    private String entrNo                 ;     // 협력사번호
    private String goodsNm                ;     // 상품명

    private String goodsRegId             ;     // 상품 등록자ID
    private String pregGoodsNoList        ;     // 가등록상품번호목록
    private String[] pregGoodsNoArray     ;     // 가등록상품번호배열

}
