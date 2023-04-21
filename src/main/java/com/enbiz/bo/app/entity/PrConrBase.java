package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("prConrBase")
@Getter
@Setter
public class PrConrBase extends BaseCommonEntity {

    private String conrNo                   ; // 전시코너번호
    private String conrNm                   ; // 전시코너명
    private String useYn                    ; // 사용여부
    private String aempId                   ; // 담당자ID
    private String setUseYn                 ; // 세트사용여부
    private String mtstUseYn                ; // 다종세트사용여부
    private Integer setCnt                  ; // 세트갯수
    private String conrImgPathNm            ; // 코너이미지경로명
    private String conrImgFileNm            ; // 코너이미지파일명
    private String conrDesc                 ; // 코너설명

}