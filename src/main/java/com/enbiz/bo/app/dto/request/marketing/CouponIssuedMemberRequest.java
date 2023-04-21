package com.enbiz.bo.app.dto.request.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponIssuedMemberRequest")
@Getter
@Setter
public class CouponIssuedMemberRequest extends BaseCommonEntity {
    private String cpnNo;  //쿠폰번호
    private String mbrNo;  //회원번호
    private String useYn;  //사용여부
}
