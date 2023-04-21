package com.enbiz.bo.app.entity;

import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("StIndInfoQryLog")
@Setter
@Getter
public class StIndInfoQryLog {
	private	String userId;				//사용자아이디
	private	String rtTgtSeq;			//권한대상순번
	private	LocalDateTime workDtm;		//작업일시
	private	String rtGrpNo;				//권한그룹번호
	private	String callUrl;				//호출URL
	private	String prmtInfo;			//파라미터정보
	private	String ipAddr;				//IP주소
	private String sysRegId;			//시스템등록자ID
	private LocalDateTime sysRegDtm;	//시스템등록일시
}
