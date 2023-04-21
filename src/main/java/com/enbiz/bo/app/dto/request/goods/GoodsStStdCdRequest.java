package com.enbiz.bo.app.dto.request.goods;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 상품등록 공통코드 Request DTO
 * ==========================
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoodsStStdCdRequest extends BaseCommonEntity{

    private String grpCd;           // 그룹코드
    private String[] grpCdList;     // 그룹코드 배열

}
