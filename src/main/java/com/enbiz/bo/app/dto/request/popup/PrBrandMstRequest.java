package com.enbiz.bo.app.dto.request.popup;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 브랜드 조회 팝업 Request Dto
 * ==========================
 */
@Alias("PrBrandMstRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrBrandMstRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    String argSelectType           ;  // 선택구분 ( 1 : 단일 , N : 다중 )
    String argUseYn                ;  // 사용여부

    //===============[Query Argument]===============//

    private String brandNo         ;  // 브랜드번호
    private String brandNm         ;  // 브랜드명
    private String useYn           ;  // 사용여부

}
