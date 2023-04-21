package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 표준카테고리 전시정보 Response
 */
@Getter
@Setter
@Alias("StandardCategoryDisplayResponse")
public class StandardCategoryDisplayResponse extends BaseCommonEntity {
    private String stdCtgNo                 ; //  표준카테고리번호
    private String dispCtgNo                ; //  전시카테고리번호
    private String repCtgYn                 ; //  대표카테고리여부
    private String useYn                    ; //  사용여부
    private String siteNm                   ; //  사이트명
    private String dispCtgHierarchy         ; //  전시카테고리 구조
}
