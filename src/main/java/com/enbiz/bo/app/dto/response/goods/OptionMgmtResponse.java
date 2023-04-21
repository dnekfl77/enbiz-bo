package com.enbiz.bo.app.dto.response.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 옵션관리 Response DTO
 */
@Alias("OptionMgmtResponse")
@Getter
@Setter
public class OptionMgmtResponse extends BaseCommonEntity {

    private String optnCatNo          ; // 옵션분류번호
    private String optnCatRegGbCd     ; // 옵션분류등록구분코드(PR018)
    private String entrNo             ; // 협력사번호
    private String optnCatTypCd       ; // 옵션분류유형코드(PR019)
    private String optnCatNm          ; // 옵션분류명
    private Integer sortSeq           ; // 정렬순서
    private String useYn              ; // 사용여부

    private String optnCatRegGbCdNm   ; // 옵션분류등록구분코드명
    private String optnCatTypCdNm     ; // 옵션분류유형코드명
    private String entrNm             ; // 협력사명

    private String optnNo             ; // 옵션번호
    private String optnNm             ; // 옵션명

}
