package com.enbiz.bo.app.controller.messaging;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.enbiz.bo.app.dto.request.messaging.ReceiveMessage;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ReceiveMessageController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/alarm/message")
    public void message(ReceiveMessage message) {
        messagingTemplate.convertAndSend("/sub/alarm/gate/" + message.getId(), message);
    }

}
