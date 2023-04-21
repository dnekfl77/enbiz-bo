package com.enbiz.bo.app.entity;

import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import com.enbiz.common.base.entity.BaseCommonEntity;

import lombok.Getter;
import lombok.Setter;

@Alias("EtMbrGradeHist")
@Getter
@Setter
public class EtMbrGradeHist extends BaseCommonEntity {
    private	String mbrNo;	            //회원번호
    private	String mbrGradeCd;	        //회원등급코드(ME024)
    private LocalDateTime histStrDtm;	//이력시작일시
    private	LocalDateTime histEndDtm;	//이력종료일시
    private	Long ordCnt;	            //주문건수
    private	Long ordAmt;	            //주문금액
    private	LocalDateTime lstEvltDtm;	//최종평가일시
}
