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
 * 채널 조회 팝업 Request Dto
 * ==========================
 */

@Alias("CcChlBaseRequest")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CcChlBaseRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    private String argSelectType;
    private String argChlClssCd;

    //===============[Query Argument]===============//
    private String grpCd 		; 	// 공통코드 그룹값
    private String cd			; 	// 공통코드 값
    private String cdNm			; 	// 공통코드 이름
    private String chlNo		; 	// 채널번호
    private String chlNm		; 	// 채널명
    private String chlClssCd	; 	// 채널분류코드
    private String chlTypCd		; 	// 채널유형코드


}
