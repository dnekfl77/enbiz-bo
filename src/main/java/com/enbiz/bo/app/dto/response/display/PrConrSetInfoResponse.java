package com.enbiz.bo.app.dto.response.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PrConrSetInfoResponse")
@Getter
@Setter
public class PrConrSetInfoResponse extends BaseCommonEntity {

    private String dispCtgNo                ; // 전시카테고리번호
    private String conrNo                   ; // 전시코너번호
    private String conrTgtNo                ; // 코너대상번호
    private String dpthNo                   ; // 깊이번호
    private String setNm                    ; // 세트명
    private Integer dispSeq                 ; // 전시순서
    private String dispYn                   ; // 전시여부
    private String setDesc                  ; // 세트설명
    private String grpTgtNo                 ; // 그룹대상번호
    private String uprConrTgtNo             ; // 상위 코너대상 번호

}
