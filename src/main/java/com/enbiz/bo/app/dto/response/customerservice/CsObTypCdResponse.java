package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsObTypCdResponse")
@Getter
@Setter
public class CsObTypCdResponse extends BaseCommonEntity {
    private	String obTypNo;
    private	String obTypNm;
    private	String obTypDesc;
    private	String useYn;
    private	String cnslTypNo;
    private	String cnslTypNm;
}
