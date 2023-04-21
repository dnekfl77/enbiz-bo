package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.GroupCodeRequest;
import com.enbiz.bo.app.dto.request.system.StandardCodeRequest;
import com.enbiz.bo.app.dto.response.system.GroupCodeResponse;
import com.enbiz.bo.app.dto.response.system.StandardCodeResponse;
import com.enbiz.bo.app.entity.StGrpCd;
import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.repository.system.StGrpCdMapper;
import com.enbiz.bo.app.repository.system.StGrpCdTrxMapper;
import com.enbiz.bo.app.repository.system.StStdCdMapper;
import com.enbiz.bo.app.repository.system.StStdCdTrxMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.exception.ValidationException;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
@Slf4j
@RequiredArgsConstructor
public class CommonCodeMgmtServiceImpl implements CommonCodeMgmtService {
	private final RestApiUtil restApiUtil;
	private final StGrpCdMapper stGrpCdMapper;
	private final StGrpCdTrxMapper stGrpCdTrxMapper;
	private final StStdCdMapper stStdCdMapper;
	private final StStdCdTrxMapper stStdCdTrxMapper;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public List<GroupCodeResponse> getGroupCodeList(GroupCodeRequest GroupCodeRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getGroupCodeList", GroupCodeRequest, new ParameterizedTypeReference<Response<List<GroupCodeResponse>>>() {}).getPayload();
	}

	@Override
	public int getGroupCodeListCount(GroupCodeRequest GroupCodeRequest) throws Exception {
    	return restApiUtil.get(boApiUrl+ "/api/bo/system/commonCodeMgmt/getGroupCodeListCount", GroupCodeRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<StandardCodeResponse> getStandardCodeList(StandardCodeRequest StandardCodeRequest) {
		return stStdCdMapper.getStStdCdList(StandardCodeRequest);
	}

	@Override
	public int getStandardCodeListCount(StandardCodeRequest StandardCodeRequest) {
		return stStdCdMapper.getStStdCdListCount(StandardCodeRequest);
	}

	@Override
	public void saveGroupCode(RealGridCUDRequest<GroupCodeRequest> realGridCUD) throws Exception {
    	restApiUtil.post(boApiUrl+ "/api/bo/system/commonCodeMgmt/saveGroupCode", realGridCUD, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
	}

	@Override
	public void registGroupCode(List<GroupCodeRequest> createList) throws Exception {
		for (GroupCodeRequest GroupCodeRequest : createList) {

			stGrpCdValidation(GroupCodeRequest);
			Validator.throwIfEmpty(GroupCodeRequest.getSysRegId(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));

			//그룹코드 중복 여부 확인
			Integer grpCdCount = stGrpCdMapper.getGrpCdCheck(GroupCodeRequest);
			if(grpCdCount >= 1){
				throw new ValidationException(MessageResolver.getMessage(MessageResolver.getMessage("commonCodeMgmt.grpcd.message.grpCd.grpCdDuplicate"), new String[]{GroupCodeRequest.getGrpCd()}));
			}

			//그룹코드명 중복 여부 확인
			Integer grpCdNmCount = stGrpCdMapper.getGrpCdNmCheck(GroupCodeRequest);
			if(grpCdNmCount >= 1){
				throw new ValidationException(MessageResolver.getMessage(MessageResolver.getMessage("commonCodeMgmt.grpcd.message.grpCdNm.grpCdNmDuplicate"), new String[]{GroupCodeRequest.getGrpCdNm()}));
			}

			StGrpCd stGrpCd = new StGrpCd();
			BeanUtils.copyProperties(stGrpCd, GroupCodeRequest);
			stGrpCdTrxMapper.insertStGrpCd(stGrpCd);

		}
	}

	@Override
	public void modifyGroupCode(List<GroupCodeRequest> updateList) throws Exception {
		for (GroupCodeRequest GroupCodeRequest : updateList) {

			stGrpCdValidation(GroupCodeRequest);
			Validator.throwIfEmpty(GroupCodeRequest.getSysModId(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{"시스템수정자ID"}));

			//그룹코드명 중복 여부 확인
			Integer grpCdNmCount = stGrpCdMapper.getGrpCdNmCheck(GroupCodeRequest);
			if(grpCdNmCount >= 1){
				throw new ValidationException(MessageResolver.getMessage(MessageResolver.getMessage("commonCodeMgmt.grpcd.message.grpCdNm.grpCdNmDuplicate"), new String[]{GroupCodeRequest.getGrpCdNm()}));
			}

			StGrpCd stGrpCd = new StGrpCd();
			BeanUtils.copyProperties(stGrpCd, GroupCodeRequest);
			stGrpCdTrxMapper.updateStGrpCd(stGrpCd);
		}
	}

	public void stGrpCdValidation(GroupCodeRequest GroupCodeRequest) throws Exception {

		Validator.throwIfEmpty(GroupCodeRequest.getGrpCd(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("commonCodeMgmt.label.comm.cd.id")}));
		Validator.throwIfEmpty(GroupCodeRequest.getGrpCdNm(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("commonCodeMgmt.label.comm.cd.name")}));
		Validator.throwIfEmpty(GroupCodeRequest.getUseYn(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));

		Validator.throwIfLongerThan(GroupCodeRequest.getGrpCd(),10,MessageResolver.getMessage("commonCodeMgmt.grpcd.message.maxGrpCd"));
		Validator.throwIfLongerThan(GroupCodeRequest.getGrpCdNm(),200,MessageResolver.getMessage("commonCodeMgmt.grpcd.message.maxGrpCdNm"));
	}

	@Override
	public void registStandardCode(List<StandardCodeRequest> createList) throws Exception {
		for (StandardCodeRequest StandardCodeRequest : createList) {

			stStdCdValidation(StandardCodeRequest);
			Validator.throwIfEmpty(StandardCodeRequest.getSysRegId(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));

			//코드 중복 여부 확인
			Integer grpCdCount = stStdCdMapper.getCdCheck(StandardCodeRequest);
			if(grpCdCount >= 1){
				throw new ValidationException(MessageResolver.getMessage("commonCodeMgmt.grpcd.message.cd.cdDuplicated", new String[] {StandardCodeRequest.getCd()}));
			}

			//코드명 중복 여부 확인
			Integer grpCdNmCount = stStdCdMapper.getCdNmCheck(StandardCodeRequest);
			if(grpCdNmCount >= 1){
				throw new ValidationException(MessageResolver.getMessage("commonCodeMgmt.grpcd.message.cdNm.cdNmDuplicated", new String[] {StandardCodeRequest.getCdNm()}));
			}

			StStdCd stStdCd = new StStdCd();
			BeanUtils.copyProperties(stStdCd, StandardCodeRequest);
			stStdCdTrxMapper.insertStStdCd(stStdCd);
		}
	}

	@Override
	public void modifyStandardCode(List<StandardCodeRequest> updateList) throws Exception {
		for (StandardCodeRequest StandardCodeRequest : updateList) {

			stStdCdValidation(StandardCodeRequest);
			Validator.throwIfEmpty(StandardCodeRequest.getSysModId(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));

			//코드명 중복 여부 확인
			Integer grpCdNmCount = stStdCdMapper.getCdNmCheck(StandardCodeRequest);
			if(grpCdNmCount >= 1){
				throw new ValidationException(MessageResolver.getMessage("commonCodeMgmt.grpcd.message.cdNm.cdNmDuplicated", new String[] {StandardCodeRequest.getCdNm()}));
			}

			StStdCd stStdCd = new StStdCd();
			BeanUtils.copyProperties(stStdCd, StandardCodeRequest);
			stStdCdTrxMapper.updateStStdCd(stStdCd);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveStandardCode(List<StandardCodeRequest> createList, List<StandardCodeRequest> updateList) throws Exception {
		registStandardCode(createList);
		modifyStandardCode(updateList);
	}

	public void stStdCdValidation(StandardCodeRequest StandardCodeRequest)throws Exception {

		Validator.throwIfEmpty(StandardCodeRequest.getGrpCd(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("commonCodeMgmt.label.comm.cd.id")}));
		Validator.throwIfEmpty(StandardCodeRequest.getCd(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("commonCodeMgmt.cmCodeMgmt.cd.grid.label.cd")}));
		Validator.throwIfEmpty(StandardCodeRequest.getCdNm(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("commonCodeMgmt.cmCodeMgmt.cd.grid.label.cdNm")}));
		Validator.throwIfEmpty(StandardCodeRequest.getUseYn(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
		Validator.throwIfEmpty(StandardCodeRequest.getSortSeq(),MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[]{MessageResolver.getMessage("commonCodeMgmt.cmCodeMgmt.cd.grid.label.sort.seq")}));

		Validator.throwIfLongerThan(StandardCodeRequest.getGrpCd(),10,MessageResolver.getMessage("commonCodeMgmt.grpcd.message.maxGrpCd"));
		Validator.throwIfLongerThan(StandardCodeRequest.getCd(),10,MessageResolver.getMessage("commonCodeMgmt.grpcd.message.maxCd"));
		Validator.throwIfLongerThan(StandardCodeRequest.getCdNm(),200,MessageResolver.getMessage("commonCodeMgmt.grpcd.message.maxCdNm"));
	}

}
