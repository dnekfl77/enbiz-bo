package com.enbiz.bo.app.controller.popup;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.popup.CcChlBaseRequest;
import com.enbiz.bo.app.dto.response.popup.CcChlBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.ChannelMgmtPopupService;
import com.enbiz.bo.base.annotation.RealGridSearch;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 채널 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class ChannelMgmtPopupController extends BaseController {

    private final ChannelMgmtPopupService channelMgmtPopupService;
    private final CodeService codeService;

    /**
     * 채널 조회 첫 로딩 화면
     * @param model
     * @param ccChlBaseRequest
     * @return
     * @throws Exception
     */
    @GetMapping(value="/channel/channelMgmt.channelList.do")
    public String getChannel(Model model, @Valid CcChlBaseRequest ccChlBaseRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("CH001");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", ccChlBaseRequest);
        return "views/popup/channelListPopup";
    }

    /**
     * 채널 목록 조회
     *
     * @param ccChlBaseRequest
     * @return realGridListResponse
     * @throws Exception
     */
    @RequestMapping(value = "/display/channelMgmt.getChannelList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @RealGridSearch
    public String getChannelList(CcChlBaseRequest ccChlBaseRequest) throws Exception {
        int totalCount = channelMgmtPopupService.getChannelListCount(ccChlBaseRequest);
        List<CcChlBaseResponse> ccChlList = channelMgmtPopupService.getChannelList(ccChlBaseRequest);
        RealGridListResponse response = new RealGridListResponse(ccChlList, totalCount);
        return response.toJsonString();
    }

}