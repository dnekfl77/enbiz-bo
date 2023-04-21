package com.enbiz.bo.app.dto.response.popup;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("EnEntrBaseResponse")
@Getter
@Setter
public class EnEntrBaseResponse extends BaseCommonEntity {

    private	boolean	endPage   ;	 //마지막페이지 여부
    private String entrNo     ;  // 협력사번호
    private String entrNm     ;  // 협력사명
    private String entrGbCd   ;  // 협력사구분코드
    private String entrGbNm   ;  // 협력사구분명
    private String trdTypCd   ;  // 거래형태코드
    private String trdStatCd  ;  // 거래상태코드
    private String trdStatNm  ;  // 거래상태명
    private String lgcEntrNo  ;  // 기간계협력사번호
    private String rpstmnNm   ;  // 대표자명
    private String bmanNo     ;  // 사업자 번호
    private String btyp       ;  // 업태
    private String bkind      ;  // 업종
    private String aempNm     ;  // 담당자명

}
