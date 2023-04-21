package com.enbiz.bo.app.dto.request.vendor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.enbiz.bo.app.entity.BaseCommonDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartnerCruRequest extends BaseCommonDto {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    private String argMode;       // 선택구분 ( C : 등록, RU : 상세조회 및 수정 )

    //===============[Query Argument]===============//
    private String entrNo;          //협력사번호

}
