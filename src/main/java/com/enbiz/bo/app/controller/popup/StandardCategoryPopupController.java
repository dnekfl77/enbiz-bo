package com.enbiz.bo.app.controller.popup;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.service.display.StandardCategoryMgmtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 표준 분류 조회 팝업 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class StandardCategoryPopupController extends BaseController {

    private final StandardCategoryMgmtService standardCategoryMgmtService;

    /**
     * 표준 분류 조회 팝업  호출
     * @param model
     * @return 표준 분류 조회 팝업 화면, 표준 분류 목록
     * @throws Exception
     */
    @GetMapping("popup/standardCategory.prStdCtgListPopup.do")
    public String standardCategoryPopup(Model model) throws Exception {
        model.addAttribute("zNodes", standardCategoryMgmtService.getStandardCategoryMgmt());
        return "views/popup/prStdCtgListPopup";
    }

}
