package com.enbiz.bo.app.dto.response.customerservice;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.masking.MaskString;
import com.enbiz.common.base.masking.MaskingType;

import lombok.Getter;
import lombok.Setter;

@Alias("PhoneAppointmentResponse")
@Getter
@Setter
public class PhoneAppointmentResponse extends BaseCommonEntity {
    private String procState;   //전약상태
    private String prmsDtm;     //예약일시
    private String notiTmCd;    //알림일시
    private String prmsMethCd;  //약속방식
    private String cnslMemo;    //상담메모
    @MaskString(type = MaskingType.ID)
    private String mbrId;       //회원ID
    @MaskString(type = MaskingType.NAME_KR)
    private String mbrNm;       //회원명
    private String telRgnNo;
    @MaskString(type = MaskingType.MOBILE_NUM)
    private String telTxnoNo;
    private String telEndNo;
    private String ordNo;       //주문번호
    private String ccnNo;       //상담번호
    private String acptmnNm;    //접수자
    private String acptmnDept;  //팀/실정보
    private String procmnNm;    //처리자
    private String procmnDept;  //팀/실정보
    private String aempProcDtm; //완료일시시
}
