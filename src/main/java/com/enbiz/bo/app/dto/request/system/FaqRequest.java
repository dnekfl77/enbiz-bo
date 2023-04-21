package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * FAQ관리 Request Dto
 * ==========================
 */

@Alias("FaqRequest")
@Setter
@Getter
public class FaqRequest extends BaseCommonEntity {

    private String faqLgrpCd	    ; 	// FAQ대분류코드
    private String faqMgrpCd	    ; 	// FAQ중분류코드
    private String title		    ; 	// 제목
    private String bbYn         	; 	// 게시여부
    private String faqNo            ;   // FAQ번호
    private String argInsertUpdate  ;   // 입력, 수정 여부

}
