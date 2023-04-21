package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CounselingTypeRequest")
@Getter
@Setter
public class CounselingTypeRequest extends BaseCommonEntity {
    private String uprCnslTypNo;
    private String useYn;
    private String rootCnslTypNo;
}
