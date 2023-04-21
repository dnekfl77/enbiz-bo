package com.enbiz.bo.app.dto.request.goods;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * 옵션관리 Request DTO
 */
@Alias("OptionMgmtRequest")
@Getter
@Setter
public class OptionMgmtRequest extends BaseCommonEntity {

    private String condxOptnCatTypCd;   // 옵션분류유형코드(PR019)
    private String condxUseYn;          // 사용여부

    private String optnCatNo;           // 옵션분류번호

}
