package com.enbiz.bo.app.dto.request.system;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("UserListRequest")
@Getter
@Setter
public class UserListRequest extends BaseCommonEntity {
    private String jobGrpCd;
    private String userId;
    private String userNm;
}
