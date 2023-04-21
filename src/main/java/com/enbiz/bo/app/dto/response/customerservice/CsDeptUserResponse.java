package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsDeptUserResponse")
@Getter
@Setter
public class CsDeptUserResponse extends BaseCommonEntity {
    private String userId;
    private String userNm;
    private String userGbCd;
}
