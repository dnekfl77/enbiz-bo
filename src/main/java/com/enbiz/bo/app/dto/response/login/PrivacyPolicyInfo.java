package com.enbiz.bo.app.dto.response.login;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivacyPolicyInfo extends BaseCommonEntity {

    private String userId; //사용자ID
    private String indInfoGbCd; //개인정보구분코드(UR008)
    private String useYn; //사용여부

}
