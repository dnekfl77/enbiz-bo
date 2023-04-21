package com.enbiz.bo.app.controller.common;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.enbiz.bo.app.dto.ajax.JSONResponseEntity;
import com.enbiz.bo.app.dto.code.CodeReqDto;
import com.enbiz.bo.app.dto.login.CurrentUser;
import com.enbiz.bo.app.dto.request.delivery.FullOrderRequest;
import com.enbiz.bo.app.dto.response.delivery.FullOrderResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.service.code.CodeService;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.bo.app.service.delivery.FullOrderInquiryService;
import com.enbiz.common.base.entity.BaseCommonEntity;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.util.ExcelUtils;
import com.enbiz.common.base.util.ReflectionUtils;

import lombok.RequiredArgsConstructor;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

@Controller
@Lazy
@RequiredArgsConstructor
public class AdminCommonController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AdminCommonController.class);
	private static final String SUCCEEDED = "succeeded";
    private static final String SYSTEM_MESSAGE_ID = "id";
    private static final String SYSTEM_MESSAGE_TEXT = "text";
    private static final String SYSTEM_MESSAGE_LANG = "lang";

    private final AdminCommonService adminCommonService;
	private final CodeService codeService;
	private final FullOrderInquiryService fullOrderInquiryService;
	
	@RequestMapping("/index.do")
    public String showIndexPage() throws Exception {
        return "views/index/index";
    }

    /**
     * 시스템 메시지를 반환
     * @param messageID
     * @throws Exception
     */
    @RequestMapping(method = RequestMethod.POST, value = "Admincommon/systemMessage.do")
    @ResponseBody
    public Object systemMessage(HttpServletRequest request, HttpServletResponse response
    		, @AuthenticationPrincipal CurrentUser currentUser
    		, @RequestParam("messageID") List<String> messageID
    		, @RequestParam("langCd") String langCd
    ) throws Exception{
        @SuppressWarnings("unused")
		Locale localLan = request.getLocale();
        Locale newLocale = StringUtils.parseLocaleString(langCd);
    	String message = "";

    	JSONObject jObject = new JSONObject();
    	JSONArray jArray = new JSONArray();

        for(String msgId : messageID) {
    	    JSONObject sObject = new JSONObject();

    	    message = MessageResolver.getMessage(msgId, newLocale);
    	    try {
                sObject.put(SUCCEEDED, !message.isEmpty());
                sObject.put(SYSTEM_MESSAGE_ID, msgId);
                sObject.put(SYSTEM_MESSAGE_TEXT, message);
                sObject.put(SYSTEM_MESSAGE_LANG, newLocale.getLanguage());
                jArray.add(sObject);

            } catch (JSONException e) {
                LOGGER.error("Data json err : " + e.getMessage(), e);
            }
    	}

    	try {
            jObject.put(SUCCEEDED, true);
            jObject.put(SYSTEM_MESSAGE_LANG, newLocale.getLanguage());
            jObject.put("lists", jArray);

    	} catch (JSONException e) {
    	    LOGGER.error("Data json err : " + e.getMessage(), e);
    	}

        return jObject;
    }


    /**
     * 이미지 저장 & 리사이징 진행
     *
     * @param isGoodsCopy
     * @param uploadFileLists
     * @param goodsNo
     * @throws Exception
     */
	@RequestMapping("/common/file/resizeImage.do")
	public ModelAndView resizeImage(@RequestParam MultipartFile file, @RequestParam Map<String, String> param) throws Exception
	{
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("imgUrl", adminCommonService.resizeImageMultipartFile(file, param));

	    return mav;
	}


    /**
     * 이미지 저장 & 리사이징 진행
     *
     * @param isGoodsCopy
     * @param uploadFileLists
     * @param goodsNo
     * @throws Exception
     */
	@RequestMapping("/common/file/upLoadFile.do")
	public ModelAndView upLoadFile(@RequestParam MultipartFile file, @RequestParam Map<String, String> param) throws Exception
	{
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("imgUrl", adminCommonService.uploadMultipartFile(file, AttacheFileKind.GOODS, false));

	    return mav;
	}


	/**
	 * <pre>
	 * 에디터 이미지업로드(HTML5용)
	 * 에디터에 이미지업로드를 한다.
	 * @param request
	 * @param response
	 * @param paramDto
	 * @return
	 * @exception
	 * @date 2021.03.08. 오전 10:58:33
	 * @author N.J.Kim
	 * @비고
	 *
	 * </pre>
	 */
	@RequestMapping("/common/file/uploadImgEditor.do")
	@ResponseBody
	public Map<String, String> uploadImgEditor(MultipartHttpServletRequest req) throws Exception
	{
		List<MultipartFile> files = req.getFiles("UPLOAD_FILE");

		LOGGER.debug("[UPLOAD_FILE]:{}", files.get(0).getOriginalFilename());

		String val = adminCommonService.uploadImgEditor(files);
		LOGGER.debug("[UPLOAD_FILE_VAL]:{}", val);
		Map<String,String> result = new HashMap<>();
		result.put("Val", val);

	    return result;
	}

    /**
     * 마스킹 테스트 호출
     * @param response
     * @return ModelAndView mav
     * @throws Exception
     */
    @GetMapping("/marketing/getMaskingCUD.do")
    public ModelAndView getMaskingCUD() throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
    	mav.addObject("val", adminCommonService.getMaskingCUD());

        return mav;
    }

    /**
     * 암호화 테스트 호출
     * @param response
     * @return ModelAndView mav
     * @throws Exception
     */
    @GetMapping("/encrypt/getEncryptCUD.do")
    public ModelAndView getEncryptCUD() throws Exception {
		ModelAndView mav = new ModelAndView("jsonView");
    	mav.addObject("val", adminCommonService.getEncryptCUD());

        return mav;
    }



	@SuppressWarnings("unchecked")
	@RequestMapping("Admincommon/loadExcel.do")
	@ResponseBody
	public RealGridListResponse loadExcel(@RequestParam("excelFile") MultipartFile file,
																	  @RequestParam("excelColumns") String strColumns, @RequestParam("excelType") String strType)
			throws ClassNotFoundException {
		String fileName = file.getOriginalFilename();
		String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

		String[] columns = strColumns.split(",");
		Class<? extends BaseCommonEntity> type = (Class<? extends BaseCommonEntity>) (this.getClass().getClassLoader()
				.loadClass(strType));
		List<? extends BaseCommonEntity> stHlList;

		if (extension.contains("csv")) {
			stHlList = ExcelUtils.extractCSVList(file, columns, type);
		} else if (extension.contains("xls")) {
			stHlList = ExcelUtils.extractExcelList(file, columns, type);
		} else {
			throw new IllegalArgumentException("Unsupported File Type : " + extension);
		}
		RealGridListResponse response = new RealGridListResponse(stHlList, stHlList.size());

		return response;
	}

	@RequestMapping("/common/getCdCdNmByMixedCode.do")
	@ResponseBody
	public JSONResponseEntity getCdCdNmByMixedCode(List<CodeReqDto> reqCode) throws Exception {
		JSONResponseEntity response = new JSONResponseEntity();

		response.setMessage("OK");
		response.setSucceeded(true);
		response.setData(codeService.getForwardCdCdNmByMixedCode(reqCode));

		return response;
	}

	@RequestMapping("/common/getForwardCdCdNmFromStStdCdByGrpCdRef1Val.do")
	@ResponseBody
	public JSONResponseEntity getForwardCdCdNmFromStStdCdByGrpCdRef1Val(CodeReqDto reqCode) throws Exception {
		JSONResponseEntity response = new JSONResponseEntity();
		response.setSucceeded(true);
		response.setData(codeService.getForwardCdCdNmFromStStdCdByGrpCdRef1Val(reqCode));
		return response;
	}

	@RequestMapping("/common/downloadFile.do")
    public ResponseEntity<byte[]> downloadFile(
    		@RequestParam(required = true) String fullPath, @RequestParam(required = true)
    		String originalFileName) throws IOException {
        return adminCommonService.downloadFile(fullPath,originalFileName);
    }
    
    @GetMapping("/dlvOrdExcelDownload.do")
    public void getDlvOrdExcelDownload(HttpServletResponse response) throws Exception {
        FullOrderRequest fullOrderRequest = new FullOrderRequest();

        List<FullOrderResponse> fullOrderExcelResponseList =
                fullOrderInquiryService.getExcelFullOrderInquiryList(fullOrderRequest);

        List titles = new ArrayList();

        titles.add("주문자");
        titles.add("주문일");
        titles.add("배송일");

        List<Map<String, Object>> convertFullOrders = ReflectionUtils.convertToMaps(fullOrderExcelResponseList);

        ExcelUtils.createExcelToResponse(
                convertFullOrders,
                titles,
                String.format("%s-%s", "orders", LocalDate.now().toString()),
                "배송주문내역",
                response
        );

    }

}

