package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsDeptUserRequest")
@Getter
@Setter
public class CsDeptUserRequest extends BaseCommonEntity {
    private String deptCd;
}
