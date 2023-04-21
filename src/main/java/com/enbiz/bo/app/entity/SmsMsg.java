package com.enbiz.bo.app.entity;

import java.time.LocalDateTime;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("SmsMsg")
@Getter
@Setter
public class SmsMsg {
    private	Long msgkey;	            //메시지키
    private	LocalDateTime reqdate;	    //전송요청일시
    private	Long serialnum;	            //고객발급일련번호
    private	String id;	                //고객발급SbuID
    private	String status;	            //발송상태(1:발송대기,2:전송완료,3:수신완료)
    private	String rslt;	            //결과값
    private	String type;	            //문자전송형태(0:일반,1:콜백URL,2:동보일반,3:동보콜백URL
    private	Long repcnt;	            //동보결과개수
    private	String phone;	            //수신자번호(동보일경우 전화번호개수)
    private	String callback;	        //송신자번호
    private LocalDateTime rsltdate;	    //통신사결과통보일시
    private	LocalDateTime reportdate;	//결과수신일시
    private	String msg;	                //전송메시지
    private	String net;	                //이동통시사정보
    private	String etc1;	            //기타1
    private	String etc2;	            //기타2
    private	String etc3;	            //기타3
    private	String etc4;	            //기타4
    private	String etc5;	            //기타5
    private	String etc6;	            //기타6
}
