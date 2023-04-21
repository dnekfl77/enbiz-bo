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
 * 협력사 조회 팝업 Request Dto
 * ==========================
 */

@Alias("EnEntrBaseRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnEntrBaseRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    private String argSelectType ;    // 선택구분
    private String argTrdStatCd  ;    // 거래상태
    private String argEntrGbCd   ;    // 협력사 구분

    //===============[Query Argument]===============//
    private String entrGbCd      ;    // 협력사 구분 코드
    private String trdStatCd     ;    // 거래상태 코드
    private String entrNo        ;    // 협력사 번호
    private String entrNm        ;    // 협력사명

}
