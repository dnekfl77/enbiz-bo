package com.enbiz.bo.app.controller.order;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.order.CommonOrderService;

import lombok.RequiredArgsConstructor;

/**
 * 공통주문
 */
@RequiredArgsConstructor
@Controller
public class CommonOrderController {

    private final CodeService codeService;
    private final CommonOrderService commonOrderService;

    /**
     * 공통주문
     */
    @PostMapping("/order/commonOrder.saveOrder.do")
    @ResponseBody
    public String saveOrder(@RequestParam Map<String,Object> dlvList) throws Exception {
        commonOrderService.saveOrder();
        return "OK";
    }

}
