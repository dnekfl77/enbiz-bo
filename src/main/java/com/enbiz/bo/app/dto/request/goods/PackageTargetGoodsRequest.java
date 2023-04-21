package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 묶음 대상 상품 Request
 */
@Getter
@Setter
@Alias("PackageTargetGoodsRequest")
public class PackageTargetGoodsRequest extends BaseCommonEntity {

    private String entrNo 	                       ;    //  협력사번호
    private String goodsCompCd	                   ;    //  상품구성코드(PR001)
    private String goodsTypCd	                   ;    //  상품유형코드(PR002)
    private String saleMethCd	                   ;    //  판매방식코드(PR003)
    private String buyTypCd	                       ;    //  매입형태코드(PR006)
    private String deliProcTypCd                   ;    // 	배송처리유형코드(PR008)
    private String goodsNo                         ;    //  상품번호
    private String goodsNm 	                       ;    //  상품명
    private String brandNo	                       ;    //  브랜드번호
    private String stdCtgNo                        ;    //  표준카테고리번호

    private String[] saleStatCdList                                        ;    // 판매상태목록
    private String goodsRegStartDtm                                        ;    // 상품등록시작일자
    private String goodsRegEndDtm                                          ;    // 상품등록종료일자
    private String mdId                                                    ;    // MD아이디


}
