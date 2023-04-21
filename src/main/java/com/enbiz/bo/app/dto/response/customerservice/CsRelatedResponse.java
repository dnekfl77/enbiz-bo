package com.enbiz.bo.app.dto.response.customerservice;

import java.util.List;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.encrypt.Encrypt;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("CsRelatedResponse")
@Getter
@Setter
public class CsRelatedResponse extends BaseCommonEntity {
    private String ccnNo;
    private String ordNo;
    private String goodsNo;
    private String goodsNm;
    private String entrNo;
    private String entrNm;
    private String mbrNo;
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm;
    private String noMaskingMbrNm;
    @MaskString(type = MaskingType.ID)
    private String loginId;
    private String noMaskingLoginId;
    @Encrypt
    private String rfdActnNo;
    private Integer count;
    List<IntegratedCsDetailResponse> relatedConsultation;
}
