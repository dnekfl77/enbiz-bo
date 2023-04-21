package com.enbiz.bo.app.controller.system;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.code.CodeReqDto;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.UserDeptRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.UserDeptResponse;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.UserDeptMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 사용자조직관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class UserDeptMgmtController extends BaseController {

    private final UserDeptMgmtService userDeptMgmtService;
    private final CodeService codeService;

    /**
     * 사용자조직관리 화면 호출
     *
     * @return 사용자조직관리 화면 경로
     * @throws Exception
     */
    @GetMapping("/system/userDeptMgmt.userDeptMgmtView.do")
    public String userDeptMgmtView(Model model) throws Exception {
		//업무그룹코드
		CodeReqDto reqCode = new CodeReqDto();
		reqCode.setCode("UR002");
		reqCode.setReferCode("10");

		model.addAttribute("codeList", codeService.getForwardCdCdNmFromStStdCdByGrpCdRef1Val(reqCode));

        return "views/system/userDeptMgmtView";
    }

    /**
     * 부서 계층구조 목록 조회
     * @return 표준 분류 목록
     * @throws Exception
     */
    @GetMapping(value = "/system/userDeptMgmt.getUserDeptListWithHierarchy.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<UserDeptResponse> getUserDeptListWithHierarchy() throws Exception {
        return userDeptMgmtService.getUserDeptListWithHierarchy();
    }

    /**
     * 부서 목록 조회
     * @param UserDeptRequest
     * @return 하위 표준 분류 목록
     * @throws Exception
     */
    @GetMapping(value = "/system/userDeptMgmt.getUserDeptMgmtList.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public RealGridListResponse getUserDeptMgmtList(UserDeptRequest request) throws Exception {
    	log.debug("[request]{}", request);
        int totalCount = userDeptMgmtService.getUserDeptListCount(request);
        List<UserDeptResponse> childCategoryList = userDeptMgmtService.getUserDeptList(request);
        RealGridListResponse response = new RealGridListResponse(childCategoryList, totalCount);
        return response;
    }

    /**
     * 부서 목록 저장
     * @param realGridCUD 추가, 수정, 삭제 목록
     * @return 성공 메세지
     * @throws Exception
     */
    @PostMapping("/system/userDeptMgmt.saveUserDeptList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveUserDeptList(
            @RealGridCUD(type = UserDeptRequest.class)RealGridCUDRequest<UserDeptRequest> realGridCUD) throws Exception{
    	log.debug("[realGridCUD]{}", realGridCUD);
        List<UserDeptRequest> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        userDeptMgmtService.saveUserDeptList(createList, updateList, deleteList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }


}
