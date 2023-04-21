package com.enbiz.bo.app.controller.messaging;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/alarm")
public class ReceiveGateController {

    private final ReceiveGateRepository receiveGateRepository;

    @GetMapping("/gates")
    @ResponseBody
    public List<ReceiveGate> getGates() {
        return receiveGateRepository.findAllGate();
    }

    @PostMapping("/gate")
    @ResponseBody
    public ReceiveGate createGate(@RequestParam ReceiveGate reciReceiveGate) {
        return receiveGateRepository.createReceiveGate(reciReceiveGate);
    }

    @GetMapping("/gate/{loginId}")
    @ResponseBody
    public ReceiveGate getGateInfo(@PathVariable String loginId) {
        return receiveGateRepository.findGateById(loginId);
    }
}
