package com.enbiz.bo.app.dto.request.customerservice;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CsAutoMangersRequest")
@Getter
@Setter
public class CsAutoMangersRequest extends BaseCommonEntity {
    private List<String> autoDivNoList;
    private String state;
}
