package com.enbiz.bo.app.dto.request.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CooperateAndOthersRequest")
@Getter
@Setter
public class CooperateAndOthersRequest extends BaseCommonEntity {

    private String mode;          // 화면상태 (C:추가, U:수정)
    private String entrNo;          // 제휴사번호

}
