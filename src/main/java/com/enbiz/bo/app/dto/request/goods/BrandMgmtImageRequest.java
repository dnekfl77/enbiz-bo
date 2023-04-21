package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 브랜드관리 이미지 Request DTO
 */
@Alias("BrandMgmtImageRequest")
@Getter
@Setter
public class BrandMgmtImageRequest extends BaseCommonEntity {
    private String brandNo      ; // 브랜드번호
    private String imgSizeCd    ; // 이미지크기코드
    private String imgSize      ; // 이미지 사이즈
    private String imgNo        ; // 이미지번호
    private String imgRouteNm   ; // 이미지경로명
    private String imgFileNm    ; // 이미지파일명
}
