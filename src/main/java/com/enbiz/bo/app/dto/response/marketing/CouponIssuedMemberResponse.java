package com.enbiz.bo.app.dto.response.marketing;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("CouponIssuedMemberResponse")
@Getter
@Setter
public class CouponIssuedMemberResponse extends BaseCommonEntity {
    private String cpnIsuNo; //쿠폰발급번호
    private String mbrNo; //회원번호
    private String mbrNm; //회원명
    private String loginId; //로그인ID
    private String mbrGradeCd; //회원등급코드
    private String mbrGradeNm; //회원등급
    private String cpnNo; //쿠폰번호
    private String cpnIsuDtm;//쿠폰발급일시
    private String valiStrtDtm; //유효시작일시
    private String valiEndDtm; //유효종료일시
    private String useYn; // 사용여부
}
