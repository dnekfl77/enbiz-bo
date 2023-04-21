package com.enbiz.bo.app.dto.request.vendor;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("PartnerSearchRequest")
@Getter
@Setter
public class PartnerSearchRequest extends BaseCommonEntity {

    //===============[View Argument]===============//

    //===============[Query Argument]===============//
    private String entrNo;          // 협력사번호
    private String entrNm;          // 협력사명
    private String trdStatCd;       // 거래상태코드
    private String trdTypCd;        // 거래형태코드

}
