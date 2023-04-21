package com.enbiz.bo.app.dto.response.popup;


import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("StRtTgtMenuResponse")
@Getter
@Setter
public class StRtTgtMenuResponse extends BaseCommonEntity {

    private String rtTgtSeq 	   ;  // 권한대상순번
    private String rtTgtNm 		   ;  // 권한대상명
    private String uprRtTgtSeq 	   ;  // 상위권한대상순번
    private String sortSeq 		   ;  // 정열순서
    private String leafMenuYn 	   ;  // 최하위메뉴여부
    private String callUrl 		   ;  // 호출URL
    private String rtTgtTypCd 	   ;  // 권한대상유형코드 ( UR010 )
    private String rtTgtTypNm      ;  // 권한대상유형명
    private String useYn 		   ;  // 사용여부
    private String custInfoInclYn  ;  // 고객정보포함여부
    private String sysGbCd         ;  // 시스템구분코드 ( UR005 )
    private String sysGbNm         ;  // 시스템구분명
    private String hierarchy       ;  // 계층

}
