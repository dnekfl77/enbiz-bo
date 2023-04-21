package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 상품리뷰첨부파일 Entity
 */
@Alias("PrGoodsRevAtchFile")
@Getter
@Setter
public class PrGoodsRevAtchFile extends BaseCommonEntity{

    private String revNo                ; // 리뷰번호
    private String fileSeq              ; // 파일순번
    private String atchFileRouteNm      ; // 첨부파일경로명
    private String atchFileNm           ; // 첨부파일명

}
