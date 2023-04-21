package com.enbiz.bo.app.dto.request.popup;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StZipNoPopupRequest")
@Getter
@Setter
public class StZipNoPopupRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    String argSelectType ;  //선택구분 ( 1 : 단일 , N : 다중 )

    //===============[Query Argument]===============//
    String param1;
    String param2;

}
