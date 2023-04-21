package com.enbiz.bo.app.controller.messaging;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.login.LoginRequest;
import com.enbiz.bo.app.dto.request.messaging.ReceiveMessage;
import com.enbiz.bo.app.service.main.MainService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MessageSenderController {

    private final MainService mainService;

    @GetMapping("/alarm/send")
    @ResponseBody
    public JSONResponseEntity<ReceiveMessage> getReceiveAlarmByLoginId(@AuthenticationPrincipal LoginRequest currentUser) {
        JSONResponseEntity<ReceiveMessage> response = new JSONResponseEntity<ReceiveMessage>();
        response.setSucceeded(true);
        response.setData(mainService.getAlarmMessage(currentUser));
        return response;
    }

}
