package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 표준카테고리 전시정보 Request
 */
@Getter
@Setter
@Alias("StandardCategoryDisplayRequest")
public class StandardCategoryDisplayRequest extends BaseCommonEntity {

    private String stdCtgNo     ;          //  표준카테고리번호

}
