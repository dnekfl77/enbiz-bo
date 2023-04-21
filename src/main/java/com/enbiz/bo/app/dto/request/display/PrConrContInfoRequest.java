package com.enbiz.bo.app.dto.request.display;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * ==========================
 * 코너 컨텐츠 정보 Request Dto
 * ==========================
 */

@Alias("PrConrContInfoRequest")
@Setter
@Getter
public class PrConrContInfoRequest extends BaseCommonEntity {

    private String dispCtgNo	; 	// 전시카테고리번호
    private String conrNo		; 	// 전시코너번호
    private String conrTgtNo	; 	// 전시코너대상번호
    private String conrTgtCd	; 	// 코너대상번호
    private String conrContNo	; 	// 코너컨텐츠번호
    private String conrTgtNoSelect	; 	// 전시코너대상번호 _ 현재 탭
    private String conrTgtCdSelect	; 	// 코너대상번호 _ 현재 탭

    // 코너대상코드가 HTML인 경우 사용
    private String argInsertUpdate ; 	// 입력 수정 구분용

}
