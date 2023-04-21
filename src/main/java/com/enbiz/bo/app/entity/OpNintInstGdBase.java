package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("opNintInstGdBase")
@Getter
@Setter
public class OpNintInstGdBase extends BaseCommonEntity {
    private String nintInstGdNo	    ; 	// 일련번호
    private String acqrCd	        ; 	// 매입사
    private String aplyStrDtm	    ; 	// 적용시작일시
    private String aplyEndDtm	    ; 	// 적용종료일시
    private String nintInstNm	    ; 	// 무이자 할부명
}
