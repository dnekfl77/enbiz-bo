package com.enbiz.bo.app.dto.request.popup;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * ==========================
 * 메뉴 조회 팝업 Request Dto
 * ==========================
 */

@Alias("StRtTgtMenuRequest")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StRtTgtMenuRequest extends BaseCommonEntity {

    //===============[View Argument]===============//
    @NotNull
    @NotEmpty
    String sysGbCd ;  // 시스템구분 ( 11: 백오피스 , 12: 고객센터 , 31: 파트너 , 32 : 제휴사 )

}
