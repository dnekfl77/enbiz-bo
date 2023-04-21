package com.enbiz.bo.app.controller.goods;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.controller.BaseController;
import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.request.goods.BrandMgmtImageRequest;
import com.enbiz.bo.app.dto.request.goods.BrandMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtImageResponse;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.goods.BrandMgmtService;
import com.enbiz.common.base.exception.MessageResolver;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 브랜드관리 Controller
 */
@Controller
@Lazy
@Slf4j
@RequiredArgsConstructor
public class BrandMgmtController extends BaseController {

    private final AdminCommonService adminCommonService;
    private final BrandMgmtService brandMgmtService;

    /**
     * 브랜드관리 화면 호출
     * @return String
     * @throws Exception
     */
    @GetMapping("/goods/brandMgmt.brandMgmtView.do")
    public String brandManageList() throws Exception {
        return "views/goods/brandMgmtView";
    }

    /**
     * 브랜드 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/brandMgmt.getBrandList.do")
    @ResponseBody
    public RealGridListResponse getBrandList(BrandMgmtRequest request) throws Exception {
        List<BrandMgmtResponse> brandList = brandMgmtService.getBrandList(request);
        return new RealGridListResponse(brandList, brandList.size());
    }

    /**
     * 브랜드 이미지 조회
     * @param brandNo
     * @return
     * @throws Exception
     */
    @GetMapping("/goods/brandMgmt.getBrandImageList.do")
    @ResponseBody
    public List<BrandMgmtImageResponse> getBrandImageList(@RequestParam String brandNo) throws Exception {
        return brandMgmtService.getBrandImageList(brandNo);
    }

    /**
     * 브랜드 저장
     * @param file
     * @param param
     * @return
     * @throws Exception
     */
    @PostMapping("/goods/brandMgmt.saveBrand.do")
    @ResponseBody
    public JSONResponseEntity saveBrand(@RequestParam(required = false) List<MultipartFile> file, @RequestParam Map<String, String> param) throws Exception
    {
        ObjectMapper objectMapper = new ObjectMapper();
        BrandMgmtRequest brandMgmtRequest = objectMapper.readValue(param.get("BrandMgmtRequest"), BrandMgmtRequest.class);
        brandMgmtRequest.setBrandMgmtImageRequestList(new ArrayList<>());
        if(file!=null) {
            for (MultipartFile multipartFile : file) {
                Map<String, String> resultImageMap = adminCommonService.uploadMultipartFile(multipartFile, AttacheFileKind.GOODS, false);
                BrandMgmtImageRequest brandImg = new BrandMgmtImageRequest();
                String fileSize = resultImageMap.get("I_FILE_SIZE");
                String fileUrl = resultImageMap.get("I_FILE_URL");
                String fileTitle = resultImageMap.get("I_FILE_TITLE");
                brandImg.setImgFileNm(fileTitle);
                brandImg.setImgSize(fileSize);
                brandImg.setImgRouteNm(fileUrl);
                brandMgmtRequest.getBrandMgmtImageRequestList().add(brandImg);
            }
        }
        brandMgmtService.saveBrand(brandMgmtRequest);
        return new JSONResponseEntity(MessageResolver.getMessage("adminCommon.message.saved.successfully"));
    }
}
