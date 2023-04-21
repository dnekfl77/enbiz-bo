package com.enbiz.bo.app.entity;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("ccCpnIsuMbr")
@Getter
@Setter
public class CcCpnIsuMbr extends BaseCommonEntity {
    private String cpnIsuNo;   //쿠폰발급번호
    private String mbrNo;       //회원번호
    private String cpnNo;       //쿠폰번호
    private String cpnIsuDtm;   //쿠폰발급일시
    private String valiStrtDtm; //유효시작일시
    private String valiEndDtm;  //유효종료일시
    private String useGbCd;     //사용구분코드 ( ME014 )
    private String useYn;       //사용여부
    private String ordNo;       //주문번호
    private String ordSeq;      //주문순번
    private String useDtm;      //사용일시
    private String mgrMemo;     //관리메모
    private String sysRegId;    //시스템등록자 ID
    private String sysRegDtm;   //시스템등록일시
    private String sysModId;    //시스템수정자ID
    private String sysModDtm;   //시스템수정일시
    private String payNo;       //결제번호
    private String mbrNtcYn;    //회원알림번호
}
