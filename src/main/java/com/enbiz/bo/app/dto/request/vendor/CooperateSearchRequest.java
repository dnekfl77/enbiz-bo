package com.enbiz.bo.app.dto.request.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CooperateSearchRequest")
@Getter
@Setter
public class CooperateSearchRequest extends BaseCommonEntity {

    //===============[View Argument]===============//

    //===============[Query Argument]===============//
    private String condxEntrNo;          // 협력사번호
    private String condxEntrNm;          // 협력사명
    private String condxTrdStatCd;       // 거래상태코드

}
