package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 브랜드 관리 이미지 Response DTO
 */
@Alias("BrandMgmtImageResponse")
@Getter
@Setter
public class BrandMgmtImageResponse extends BaseCommonEntity {
    private String brandNo      ; // 브랜드번호
    private String imgFileNm    ; // 이미지파일명
    private String imgNo        ; // 이미지번호
    private String imgRouteNm   ; // 이미지경로명
    private String imgSizeCd    ; // 이미지크기코드
}
