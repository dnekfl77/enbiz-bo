package com.enbiz.bo.app.dto.request.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsCompensReturnRequest")
@Getter
@Setter
public class CsCompensReturnRequest extends BaseCommonEntity {
    private String type;            // C : 접수취소 , A : 보상승인반려 , B : 지급승인반려
    private String custCpnsAplyNo;  //
    private String memo;            //
}
