package com.enbiz.bo.app.service.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.ValidationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.enbiz.bo.app.dto.EncryptCUD;
import com.enbiz.bo.app.dto.MaskingCUD;
import com.enbiz.bo.app.dto.request.common.DashboardAlarmRequest;
import com.enbiz.bo.app.dto.response.common.DashboardAlarmResponse;
import com.enbiz.bo.app.dto.response.common.DashboardGoodsQnaIngResponse;
import com.enbiz.bo.app.dto.response.common.DashboardTrustVendorGoodsApprovalResponse;
import com.enbiz.bo.app.entity.SmsMsg;
import com.enbiz.bo.app.enums.common.AttacheFileKind;
import com.enbiz.bo.app.repository.common.AdminCommonBaseTrxMapper;
import com.enbiz.bo.app.repository.common.StJobCnctInfoMapper;
import com.enbiz.bo.app.repository.customerservice.CsCustCnslInfoMapper;
import com.enbiz.bo.app.repository.goods.PrGoodsBaseMapper;
import com.enbiz.bo.app.repository.goods.PrPregGoodsBaseMapper;
import com.enbiz.bo.app.service.vendor.VendorManagementService;
import com.enbiz.bo.base.upload.UploadReqDto;
import com.enbiz.bo.base.upload.UploadResDto;
import com.enbiz.bo.base.upload.Uploader;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@RequiredArgsConstructor
public class AdminCommonServiceImpl implements AdminCommonService {
	private static final Logger logger = LoggerFactory.getLogger(AdminCommonServiceImpl.class);

	private final VendorManagementService vendorManagementService;
	private final StJobCnctInfoMapper stJobCnctInfoMapper;
	private final CsCustCnslInfoMapper csCustCnslInfoMapper;
	private final PrPregGoodsBaseMapper prPregGoodsBaseMapper;
	private final PrGoodsBaseMapper prGoodsBaseMapper;
	private final Environment env;
    private final AdminCommonBaseTrxMapper adminCommonBaseTrxMapper;
    private final Uploader uploader;

    @Autowired
    @Qualifier("domainConfig")
	private PropertiesFactoryBean domainConfig;

    @Override
    public void insertInitPassWordSms(SmsMsg smsMsg) throws Exception {
        adminCommonBaseTrxMapper.insertInitPassWordSms(smsMsg);
    }

	@Override
	public MaskingCUD getMaskingCUD() throws Exception {
			return adminCommonBaseTrxMapper.getMaskingCUD();
	}

	@Override
	public EncryptCUD getEncryptCUD() throws Exception {
			return adminCommonBaseTrxMapper.getEncryptCUD();
	}

	/**
	 * 파일 저장
	 * 파일을 업로드를 한다.
	 * @return String
	 * @date 2021. 03. 08. 오후 2:37:27
	 * @author N.J.Kim
	 * @throws Exception
	 */
	@Override
	public Map<String,String> uploadMultipartFile(MultipartFile mFile, AttacheFileKind kind, boolean temp) throws Exception {
		logger.debug("☆★☆★[uploadFileTest]☆★☆★");

		UploadReqDto uploadReqDto = new UploadReqDto();
        uploadReqDto.setAttacheFileKind(kind);
        uploadReqDto.setTempPathYn(temp);
        uploadReqDto.setCustomPath("");
        uploadReqDto.setTypeCd("10");

		Map<String, Object> retMap = uploader.upload(mFile, uploadReqDto);

		if ("00".equals(retMap.get("cd")) ) { // S3 정상 업로드인경우

			UploadResDto uploadResDto = (UploadResDto)((Map<String, Object>)retMap.get("data")).get("data");

			Map<String,String> fileInfo = new HashMap<>();

			fileInfo.put("I_FILE_TITLE", uploadResDto.getOrgFileName()); //사용
			fileInfo.put("I_FILE_NM", uploadResDto.getFileName()); //사용안함
			fileInfo.put("I_FILE_URL", uploadResDto.getFullPath());//사용
			fileInfo.put("I_FILE_TEMP_URL", uploadResDto.getTempFullPath());//사용
			fileInfo.put("I_FILE_PATH", uploadResDto.getPath());//사용안함
			fileInfo.put("I_FILE_SIZE", uploadResDto.getSize().toString());
			fileInfo.put("I_FILE_EXT", uploadResDto.getExtension());

			logger.debug("[I_FILE_TITLE]"+fileInfo.get("I_FILE_TITLE"));	//원본 파일명
			logger.debug("[I_FILE_NM]"+fileInfo.get("I_FILE_NM"));			//파일명
			logger.debug("[I_FILE_URL]"+fileInfo.get("I_FILE_URL"));		//파일URL
			logger.debug("[I_FILE_PATH]"+fileInfo.get("I_FILE_PATH"));		//파일경로
			logger.debug("[I_FILE_SIZE]"+fileInfo.get("I_FILE_SIZE"));		//파일사이즈
			logger.debug("[I_FILE_EXT]"+fileInfo.get("I_FILE_EXT"));		//파일확장자
			logger.debug("[I_FILE_TEMP_URL]"+fileInfo.get("I_FILE_TEMP_URL"));		//임시파일URL

			return fileInfo;
		} else {
			throw new ValidationException(MessageResolver.getMessage("adminCommon.message.upload.fail"));
		}

	}

	/**
	 * 이미지 저장 & 리사이징
	 * 이미지업로드 & 리사이징 진행을 한다.
	 * @return String
	 * @date 2021. 03. 08. 오후 2:37:27
	 * @author N.J.Kim
	 * @throws Exception
	 */
	@Deprecated
	public String resizeImageMultipartFile(MultipartFile mFile, Map<String, String> param) throws Exception {
		//아직 사용하지 않는거 같아 임시 Deprecated 처리 필요하면 S3로 변경필요

		return null;
	}



	/**
	 * 에디터 이미지 업로드
	 * 에디터에 이미지업로드를 한다.
	 * @return String
	 * @date 2021. 03. 08. 오후 2:37:27
	 * @author N.J.Kim
	 * @throws Exception
	 */
	public String uploadImgEditor(List<MultipartFile> files) throws Exception{
		logger.debug("☆★☆★[uploadFileTest]☆★☆★");

		UploadReqDto uploadReqDto = new UploadReqDto();
        uploadReqDto.setAttacheFileKind(AttacheFileKind.EDITOR);
        uploadReqDto.setTempPathYn(false);
        uploadReqDto.setCustomPath("");
        uploadReqDto.setTypeCd("10");

        Map<String, Object> retMap = uploader.upload(files, uploadReqDto);

        if ("00".equals(retMap.get("cd")) ) { // S3 정상 업로드인경우
        	List<UploadResDto> uploadResDtoList = (List<UploadResDto>)retMap.get("data");
        	String retParam = "";
        	for (UploadResDto uploadResDto : uploadResDtoList) {
        		retParam += "sFileURL=" + domainConfig.getObject().get("uploadDomain") + uploadResDto.getFullPath() + "&";
        	}
        	return retParam;
        } else {
        	throw new Exception(MessageResolver.getMessage("adminCommon.message.upload.fail"));
        }

	}

	@Override
	public List<Map<String,String>> uploadMultipartFileList(List<MultipartFile> files, AttacheFileKind kind, boolean temp)
			throws Exception {
		UploadReqDto uploadReqDto = new UploadReqDto();
        uploadReqDto.setAttacheFileKind(kind);
        uploadReqDto.setTempPathYn(temp);
        uploadReqDto.setCustomPath("");
        uploadReqDto.setTypeCd("10");

        Map<String, Object> retMap = uploader.upload(files, uploadReqDto);

        if ("00".equals(retMap.get("cd")) ) { // S3 정상 업로드인경우
        	List<Map<String,String>> fileInfoList = new ArrayList<Map<String,String>>();
        	List<UploadResDto> uploadResDtoList = (List<UploadResDto>)retMap.get("data");
        	for (UploadResDto uploadResDto : uploadResDtoList) {
        		Map<String,String> fileInfo = new HashMap<>();

    			fileInfo.put("I_FILE_TITLE", uploadResDto.getOrgFileName()); //사용
    			fileInfo.put("I_FILE_NM", uploadResDto.getFileName()); //사용안함
    			fileInfo.put("I_FILE_URL", uploadResDto.getFullPath());//사용
    			fileInfo.put("I_FILE_TEMP_URL", uploadResDto.getTempFullPath());//사용
    			fileInfo.put("I_FILE_PATH", uploadResDto.getPath());//사용안함
    			fileInfo.put("I_FILE_SIZE", uploadResDto.getSize().toString());
    			fileInfo.put("I_FILE_EXT", uploadResDto.getExtension());

    			logger.debug("[I_FILE_TITLE]"+fileInfo.get("I_FILE_TITLE"));	//원본 파일명
    			logger.debug("[I_FILE_NM]"+fileInfo.get("I_FILE_NM"));			//파일명
    			logger.debug("[I_FILE_URL]"+fileInfo.get("I_FILE_URL"));		//파일URL
    			logger.debug("[I_FILE_PATH]"+fileInfo.get("I_FILE_PATH"));		//파일경로
    			logger.debug("[I_FILE_SIZE]"+fileInfo.get("I_FILE_SIZE"));		//파일사이즈
    			logger.debug("[I_FILE_EXT]"+fileInfo.get("I_FILE_EXT"));		//파일확장자
    			logger.debug("[I_FILE_TEMP_URL]"+fileInfo.get("I_FILE_TEMP_URL"));		//임시파일URL

    			fileInfoList.add(fileInfo);
			}
        	return fileInfoList;
        } else {
        	logger.error("admin upload service error : {}" , retMap.toString());
        	throw new Exception(MessageResolver.getMessage("adminCommon.message.upload.fail"));
        }

	}
	
	@Override
	public ResponseEntity<byte[]> downloadFile(String fullPath, String originalFileName) throws IOException {
		return uploader.downloadFile(fullPath, originalFileName);
	}

	@Override
	public boolean confirmFile() {
		return uploader.confirmFile();
	}

	@Override
	public List<DashboardAlarmResponse> getDashboardAlarmList(DashboardAlarmRequest dashboardAlarmRequest) {
		return stJobCnctInfoMapper.getDashboardAlarmList(dashboardAlarmRequest);
	}

	@Override
	public List<DashboardGoodsQnaIngResponse> getDashboardGoodsQnaIngList() {
		return csCustCnslInfoMapper.getDashboardGoodsQnaIngList();
	}

	@Override
	public List<DashboardTrustVendorGoodsApprovalResponse> getDashboardTrustVendorGoodsApprovalList() {
		return prPregGoodsBaseMapper.getDashboardTrustVendorGoodsApprovalList();
	}

	@Override
	public int getDashboardGoodsTodayNewCnt() {
		return prGoodsBaseMapper.getDashboardGoodsTodayNewCnt();
	}

	@Override
	public int getDashboardGoodsTodaySoldOutCnt() {
		return prPregGoodsBaseMapper.getDashboardGoodsTodaySoldOutCnt();
	}

	@Override
	public int getDashboardGoods2WeekSellingCnt() {
		return prGoodsBaseMapper.getDashboardGoods2WeekSellingCnt();
	}

	@Override
	public int getDashboardGoods2WeekSoldOutCnt() {
		return prPregGoodsBaseMapper.getDashboardGoods2WeekSoldOutCnt();
	}

	@Override
	public void deleteFile(List<String> fullPathList) {
		uploader.deleteFile(fullPathList);
	}
}
