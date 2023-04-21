package com.enbiz.bo.app.controller.system;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseCudRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StRtTgtBase;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.system.MenuMgmtService;
import com.enbiz.bo.base.annotation.RealGridCUD;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 시스템 관리
 */
@Slf4j
@Controller
@Lazy
@RequiredArgsConstructor
public class MenuMgmtController extends BaseController {

    private final MenuMgmtService menuMgmtService;
    private final CodeService codeService;

    /**
     * 메뉴관리 목록 화면 호출
     * @return 메뉴관리 목록 관리 화면
     * @throws Exception
     */
    @GetMapping("/system/menuMgmt.menuMgmtView.do")
    public String menuMgmtView(Model model) throws Exception {
        Map<String, List<StStdCd>> codeList = codeService.getStStdCd("UR005,UR010");
        model.addAttribute("codeList", codeList);
        return "views/system/menuMgmtView";
    }

    /**
     * 메뉴 트리 리스트 조회
     * @param RtTargetBaseRequest
     * @return
     *
     */
    @GetMapping("/system/menuMgmt.getMenuMgmtTreeList.do")
    @ResponseBody
    public Map<String, Object> getMenuMgmtTreeList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
    	Map<String, Object> data = new HashMap<String, Object>();
        data.put("category", menuMgmtService.getMenuMgmtTreeList(RtTargetBaseRequest));
        data.put("menu", menuMgmtService.getMenuMgmtTreeList(RtTargetBaseRequest));
        return data;
    }

    /**
     * 메뉴 트리 클릭시 메뉴상세정보 조회
     * @param  RtTargetBaseRequest
     * @return List<RtTargetBaseResponse>
     * @throws Exception
     */
    @GetMapping("/system/menuMgmt.getMenuInfo.do")
    @ResponseBody
    public RtTargetBaseResponse getMenuInfo(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        return menuMgmtService.getMenuInfo(RtTargetBaseRequest);
    }

    /**
     * 메뉴 트리 클릭시 하위메뉴리스트 조회
     * @param  RtTargetBaseRequest
     * @return List<RtTargetBaseResponse>
     * @throws Exception
     */
    @GetMapping(value = "/system/menuMgmt.getSubMenuList.do", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public RealGridListResponse getSubMenuList(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        int totalCount = menuMgmtService.getSubMenuListCount(RtTargetBaseRequest);
        List<RtTargetBaseResponse> subMenuList = menuMgmtService.getSubMenuList(RtTargetBaseRequest);
        RealGridListResponse response = new RealGridListResponse(subMenuList, totalCount);
        return response;
    }

    /**
     * 메뉴상세정보 등록/수정 수정 및 저장
     * @param
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/system/menuMgmt.saveMenuDetailInfo.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveMenuDetailInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception {
        if(!StringUtils.isEmpty(RtTargetBaseCudRequest.getRtTgtSeq())){
        	menuMgmtService.modifyMenuInfo(RtTargetBaseCudRequest);
        }else{
        	menuMgmtService.registMenuInfo(RtTargetBaseCudRequest);
        }
        return new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }

    /**
     * 하위 메뉴 저장
     * @param realGridCUD 신규, 수정, 삭제목록
     * @return 성공 메시지
     * @throws Exception
     */
    @PostMapping("/system/menuMgmt.saveSubMenuList.do")
    @ResponseBody
    public JSONResponseEntity<Void> saveSubMenuList(@RealGridCUD(type = StRtTgtBase.class) RealGridCUDRequest<StRtTgtBase> realGridCUD) throws Exception {
        List<StRtTgtBase> createList = realGridCUD.getCreate(), updateList = realGridCUD.getUpdate(), deleteList = realGridCUD.getDelete();
        menuMgmtService.saveSubMenu(createList, updateList, deleteList);
        JSONResponseEntity<Void> jsonResponseEntity = new JSONResponseEntity<Void>(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
        return jsonResponseEntity;
    }

    /**
     * 메뉴 삭제 시 하위 메뉴가 없는지, 권한이 없지 확인
     * @param RtTargetBaseRequest
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/system/menuMgmt.getRtTargetSequenceCheck.do", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public JSONResponseEntity<Void> getRtTargetSequenceCheck(RtTargetBaseRequest RtTargetBaseRequest) throws Exception {
        JSONResponseEntity<Void> response = new JSONResponseEntity<Void>();
        if(menuMgmtService.getSubMenuCheck(RtTargetBaseRequest) == 0) {  // 하위메뉴 여부 확인
            if(menuMgmtService.getRtInfoCheck(RtTargetBaseRequest) == 0) { // 권한 여부 확인
                response.setSucceeded(true);
            } else {
                response.setSucceeded(false);
            }
        } else {
            response.setSucceeded(false);
        }
        return response;
    }

}
