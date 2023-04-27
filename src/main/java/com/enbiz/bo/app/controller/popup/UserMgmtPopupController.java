package com.enbiz.bo.app.controller.popup;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.request.popup.StUserBaseRequest;
import com.enbiz.bo.app.dto.response.popup.StUserBaseResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.popup.UserMgmtPopupService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사용자 관리
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class UserMgmtPopupController extends BaseController {

    private final UserMgmtPopupService userMgmtPopupService;

    private final CodeService codeService;

    /**
     * MD 사용자 조회 팝업 호출
     *
     * @param stUserBaseRequest
     * @return MD 조회 팝업 화면
     * @throws Exception
     */
    @GetMapping("/popup/userMgmtPopup.mdListPopup.do")
    public String mdListPopup(Model model, @Valid StUserBaseRequest stUserBaseRequest) throws Exception {

        model.addAttribute("requestData", stUserBaseRequest);
        return "views/popup/mdListPopup";
    }

    /**
     * 사용자 목록 조회
     *
     * @param   stUserBaseRequest
     * @return  RealGridListResponse
     * @throws  Exception
     */
    @GetMapping(value = "/popup/userMgmtPopup.getUserList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getUserList(StUserBaseRequest stUserBaseRequest) throws Exception{

        int totalCount = userMgmtPopupService.getUserListCount(stUserBaseRequest);
        List<StUserBaseResponse> userList = userMgmtPopupService.getUserList(stUserBaseRequest);

        RealGridListResponse response = new RealGridListResponse(userList, totalCount);
        return response;
    }

    /**
     * 사용자 목록 조회 (페이징 처리 미포함)
     *
     * @param   stUserBaseRequest
     * @return  RealGridListResponse
     * @throws  Exception
     */
    @GetMapping(value = "/popup/userMgmtPopup.getUserListNoPage.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getUserListNoPage(StUserBaseRequest stUserBaseRequest) throws Exception{

        int totalCount = userMgmtPopupService.getUserListCount(stUserBaseRequest);
        List<StUserBaseResponse> userList = userMgmtPopupService.getUserListNoPage(stUserBaseRequest);

        RealGridListResponse response = new RealGridListResponse(userList, totalCount);
        return response;
    }


    /**
     * 사용자 조회 팝업 호출
     * @return 사용자 조회 팝업 화면
     * @throws Exception
     */
    @GetMapping("/popup/userMgmtPopup.userListPopup.do")
    public String userListPopup(Model model, @Valid StUserBaseRequest stUserBaseRequest) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR002");
        model.addAttribute("codeList", codeList);
        model.addAttribute("requestData", stUserBaseRequest);
        return "views/popup/userListPopup";
    }

}
