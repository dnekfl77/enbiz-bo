package com.enbiz.bo.app.service.popup;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.popup.JobCnctListRequest;
import com.enbiz.bo.app.dto.request.popup.JobCnctRequest;
import com.enbiz.bo.app.dto.response.popup.JobCnctListResponse;
import com.enbiz.bo.app.dto.response.popup.JobCnctResponse;
import com.enbiz.bo.app.entity.StJobCnctInfo;
import com.enbiz.bo.app.entity.StJobCnctRecvmnInfo;
import com.enbiz.bo.app.enums.CM003;
import com.enbiz.bo.app.enums.CM016;
import com.enbiz.bo.app.enums.CM017;
import com.enbiz.bo.app.repository.common.StJobCnctAtchFileMapper;
import com.enbiz.bo.app.repository.common.StJobCnctInfoMapper;
import com.enbiz.bo.app.repository.common.StJobCnctRecvmnInfoMapper;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;

import lombok.extern.slf4j.Slf4j;

/**
 * 상품 조회 팝업 서비스
 */
@Service
@Lazy
@Slf4j
public class JobContactManagementPopupService {
	
	@Autowired
	StJobCnctInfoMapper stJobCnctInfoMapper;
	@Autowired
	StJobCnctRecvmnInfoMapper stJobCnctRecvmnInfoMapper;
	@Autowired
	StJobCnctAtchFileMapper stJobCnctAtchFileMapper;
	
	public List<JobCnctListResponse> getJobCnctInfoList(JobCnctListRequest jobCnctListRequest) {
		List<JobCnctListResponse> jobCnctInfoList = new ArrayList<JobCnctListResponse>();
		
		try {
			//받은문의 목록 조회
			if ("01".equals(jobCnctListRequest.getJobCnctTypeCd())) {
				jobCnctInfoList = stJobCnctRecvmnInfoMapper.getJobCnctRecvmnnInfoList(jobCnctListRequest);
			}
			//보낸문의 목록 조회
			else if ("02".equals(jobCnctListRequest.getJobCnctTypeCd())) {
				jobCnctInfoList = stJobCnctInfoMapper.getJobCnctInfoList(jobCnctListRequest);
			}
		} catch (Exception e) {
			throw new ValidationException(MessageResolver.getMessage("adminCommon.process.error"), e);
		}
		
		return jobCnctInfoList;
	}

	public int getJobCnctInfoListCount(JobCnctListRequest jobCnctListRequest) {
		int jobCnctInfoListCount = 0;
		
		try {
			//받은문의 수 조회
			if ("01".equals(jobCnctListRequest.getJobCnctTypeCd())) {
				jobCnctInfoListCount = stJobCnctRecvmnInfoMapper.getJobCnctRecvmnnInfoListCount(jobCnctListRequest);
			}
			//보낸문의 수 조회
			else if ("02".equals(jobCnctListRequest.getJobCnctTypeCd())) {
				jobCnctInfoListCount = stJobCnctInfoMapper.getJobCnctInfoListCount(jobCnctListRequest);
			}
		} catch (Exception e) {
			throw new ValidationException(MessageResolver.getMessage("adminCommon.process.error"), e);
		}
		
		return jobCnctInfoListCount;
	}

	/**
	 * 업무연락 저장
	 * @param jobCnctRequest
	 */
	@Transactional
	public void insertJobCnctInfo(JobCnctRequest jobCnctRequest) {
		
		try {
			//저장 전 입력값 체크
			stJobCnctValidation(jobCnctRequest);
			
			//1.업무연락정보 등록(발신자 정보)
			StJobCnctInfo stJobCnctInfo = new StJobCnctInfo();
			BeanUtils.copyProperties(stJobCnctInfo, jobCnctRequest);
			stJobCnctInfo.setCnctTypCd(CM003.BO.getCd());	
			stJobCnctInfoMapper.insertJobCnctInfo(stJobCnctInfo);
			
			if (jobCnctRequest.getRecvmnIds() != null) {
				for (String recvmnId : jobCnctRequest.getRecvmnIds()) {
					//2.업무연락수신자정보 등록(수신자 정보)
					StJobCnctRecvmnInfo stJobCnctRecvmnInfo = new StJobCnctRecvmnInfo();
					stJobCnctRecvmnInfo.setJobCnctNo(stJobCnctInfo.getJobCnctNo());
					stJobCnctRecvmnInfo.setRecvmnId(recvmnId);
					stJobCnctRecvmnInfo.setCnctPrgsStatCd(CM016.RECEIVE.getCd());
					stJobCnctRecvmnInfo.setDsmnAnsConfYn("N");
					stJobCnctRecvmnInfo.setSysRegId(jobCnctRequest.getSysRegId());
					stJobCnctRecvmnInfo.setSysModId(jobCnctRequest.getSysModId());
					stJobCnctRecvmnInfoMapper.insertJobCnctRecvmnInfo(stJobCnctRecvmnInfo);
					
					//3.업무연락 첨부파일 정보 등록
				}
			}
		} catch (Exception e) {
			throw new ValidationException(MessageResolver.getMessage("adminCommon.process.error"), e);
		}
	}

	/**
	 * 업무연락 insert 전 입력값 validation
	 * @param jobCnctRequest
	 */
	private void stJobCnctValidation(JobCnctRequest jobCnctRequest) throws Exception {
		//대상자
		if(jobCnctRequest.getRecvmnIds() == null || jobCnctRequest.getRecvmnIds().size() == 0){
			throw new Exception();
		}
		
		//제목
		if(StringUtils.isEmpty(jobCnctRequest.getTitle())){
			throw new Exception();
		}
		else if(jobCnctRequest.getTitle().getBytes().length > 300){
			throw new Exception();
		}
		
		//내용
		if(StringUtils.isEmpty(jobCnctRequest.getCont())){
			throw new Exception();
		}
		else if(jobCnctRequest.getCont().getBytes().length > 4000){
			throw new Exception();
		}
	}
	
	/**
	 * 업무연락 진행상태 및 조회일시를 변경한다(상세 팝업 진입 시 호출)
	 * @param jobCnctRequest
	 */
	public void updateJobCnctRecvmnInfo(JobCnctRequest jobCnctRequest) {
		try {
			StJobCnctRecvmnInfo stJobCnctRecvmnInfo = new StJobCnctRecvmnInfo();
			BeanUtils.copyProperties(stJobCnctRecvmnInfo, jobCnctRequest);
			boolean toDoUpdateFg = false; 
			
			//1. 현 업무연락수신자 정보를 조회한다.
			JobCnctResponse jobCnctRecvmnInfo = stJobCnctRecvmnInfoMapper.getJobCnctRecvmnInfo(jobCnctRequest);
			
			if (jobCnctRecvmnInfo != null && StringUtils.isNotBlank(jobCnctRecvmnInfo.getJobCnctNo())) {
				//1-1 받은 문의함을 통한 접근
				if ("01".equals(jobCnctRequest.getJobCnctTypeCd())) {
					//현재 진행상태가 '수신' 이고, 조회이력이 없으면 => 진행상태를 '읽음' 으로 변경하고 조회일시를 현재시간으로 업데이트한다.
					if (CM016.RECEIVE.getCd().equals(jobCnctRecvmnInfo.getCnctPrgsStatCd())
							&& StringUtils.isBlank(jobCnctRecvmnInfo.getQryDtm())) {
						toDoUpdateFg = true;
						stJobCnctRecvmnInfo.setCnctPrgsStatCd(CM016.READ.getCd());
					}
				}
				//1-2 보낸 문의함을 통한 접근
				else if ("02".equals(jobCnctRequest.getJobCnctTypeCd())) {
					//현재 진행상태가 '답변' 이고, 답변확인여부가 'N' 이면 => 답변확인여부를 'Y' 로 변경하고, 답변확인일시를 현재시간으로 업데이트한다.
					if (CM016.ANSWERED.getCd().equals(jobCnctRecvmnInfo.getCnctPrgsStatCd())
							&& "N".equals(jobCnctRecvmnInfo.getDsmnAnsConfYn())) {
						toDoUpdateFg = true;
						stJobCnctRecvmnInfo.setDsmnAnsConfYn("Y");
					}
				}
			}
			
			//2.업무연락수신자정보 update
			if (toDoUpdateFg) {
				stJobCnctRecvmnInfo.setSysModId(jobCnctRequest.getRecvmnId());
				stJobCnctRecvmnInfoMapper.updateJobCnctRecvmnInfo(stJobCnctRecvmnInfo);
			}
			
			
		} catch (Exception e) {
			throw new ValidationException(MessageResolver.getMessage("adminCommon.process.error"), e);
		}	
		
	}
	
	/**
	 * 업무연락 - 보낸 문의 상세 정보
	 * @param jobCnctListRequest
	 */
	public JobCnctResponse getJobCnctQuesInfo(JobCnctRequest jobCnctRequest) {
		jobCnctRequest.setDspRecvGbCd(CM017.SENDER.getCd());
		return stJobCnctInfoMapper.getJobCnctQuesInfo(jobCnctRequest);
	}
	
	/**
	 * 업무연락 - 문의에 대한 답변 상세 정보 
	 * @param jobCnctListRequest
	 */
	public JobCnctResponse getJobCnctAnsInfo(JobCnctRequest jobCnctRequest) {
		jobCnctRequest.setDspRecvGbCd(CM017.RECVMN.getCd());
		return stJobCnctRecvmnInfoMapper.getJobCnctAnsInfo(jobCnctRequest);
	}

	/**
	 * 업무연락 받은 문의에 대한 답변 저장
	 * @param jobCnctRequest
	 */
	public void saveJobCnctAnswer(JobCnctRequest jobCnctRequest) {
		
		try {
			//1.업무연락수신자정보 update
			StJobCnctRecvmnInfo stJobCnctRecvmnInfo = new StJobCnctRecvmnInfo();
			BeanUtils.copyProperties(stJobCnctRecvmnInfo, jobCnctRequest);
			stJobCnctRecvmnInfo.setCnctPrgsStatCd(CM016.ANSWERED.getCd());			
			stJobCnctRecvmnInfoMapper.updateJobCnctRecvmnInfo(stJobCnctRecvmnInfo);
			
			//2.첨부파일 정보 insert/delete
			
		} catch (Exception e) {
			throw new ValidationException(MessageResolver.getMessage("adminCommon.process.error"), e);
		}
	}
	
}
