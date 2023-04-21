package com.enbiz.bo.app.dto.request.messaging;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Alias("ReceiveMessage")
@Getter
@Setter
public class ReceiveMessage {

    // 메시지 타입 : 알람, SMS, EMAIL, PUSH
    public enum MessageType {
        ALARM, SMS, EMAIL, PUSH
    }

    private MessageType type;   	// 메시지 타입
    private String id;     				// 대상아이디
    private String count;       		// 카운트
    private String messageTxt;	//메시지

}
