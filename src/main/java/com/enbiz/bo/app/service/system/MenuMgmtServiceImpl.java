package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.RtTargetBaseCudRequest;
import com.enbiz.bo.app.dto.request.system.RtTargetBaseRequest;
import com.enbiz.bo.app.dto.response.system.RtTargetBaseResponse;
import com.enbiz.bo.app.entity.StRtTgtBase;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 메뉴관리 서비스 IMPL
 */
@Service
@Lazy
@RequiredArgsConstructor
public class MenuMgmtServiceImpl implements MenuMgmtService {

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

	@Override
	public List<RtTargetBaseResponse> getMenuMgmtTreeList(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		Validator.throwIfEmpty(rtTargetBaseRequest.getSysGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템구분코드" }));
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuMgmt/getMenuMgmtTreeList", rtTargetBaseRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseResponse>>>() {}).getPayload();
	}

	@Override
	public RtTargetBaseResponse getMenuInfo(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuMgmt/getMenuInfo", rtTargetBaseRequest, new ParameterizedTypeReference<Response<RtTargetBaseResponse>>() {}).getPayload();
	}

	@Override
	public int getSubMenuListCount(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuMgmt/getSubMenuListCount", rtTargetBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public List<RtTargetBaseResponse> getSubMenuList(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuMgmt/getSubMenuList", rtTargetBaseRequest, new ParameterizedTypeReference<Response<List<RtTargetBaseResponse>>>() {}).getPayload();
	}

	@Override
	public void registMenuInfo(RtTargetBaseCudRequest rtTargetBaseCudRequest) throws Exception {
		StRtTgtBase stRtTgtBase = new StRtTgtBase();
		BeanUtils.copyProperties(stRtTgtBase, rtTargetBaseCudRequest);
		Validator.throwIfEmpty(stRtTgtBase.getSysGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템구분코드" }));
		Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상유형코드" }));
		Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상명" }));
		Validator.throwIfEmpty(stRtTgtBase.getSortSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "정렬순서" }));
		Validator.throwIfEmpty(stRtTgtBase.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "사용여부" }));
		Validator.throwIfEmpty(stRtTgtBase.getUprRtTgtSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "상위권한대상순번" }));
		Validator.throwIfEmpty(stRtTgtBase.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템등록자ID" }));
		Validator.throwIfEmpty(stRtTgtBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템수정자ID" }));

		restApiComponent.post(boApiUrl + "/api/bo/system/menuMgmt/registMenuInfo", stRtTgtBase, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
	}

	@Override
	public void modifyMenuInfo(RtTargetBaseCudRequest RtTargetBaseCudRequest) throws Exception {
		StRtTgtBase stRtTgtBase = new StRtTgtBase();
		BeanUtils.copyProperties(stRtTgtBase, RtTargetBaseCudRequest);
		Validator.throwIfEmpty(stRtTgtBase.getRtTgtSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상순번" }));
		Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상유형코드" }));
		Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상명" }));
		Validator.throwIfEmpty(stRtTgtBase.getSortSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "정렬순서" }));
		Validator.throwIfEmpty(stRtTgtBase.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "사용여부" }));
		Validator.throwIfEmpty(stRtTgtBase.getCustInfoInclYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "고객정보포함여부" }));
		Validator.throwIfEmpty(stRtTgtBase.getPopupYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "팝업여부" }));
		Validator.throwIfEmpty(stRtTgtBase.getLeafMenuYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "최하위메뉴여부" }));
		Validator.throwIfEmpty(stRtTgtBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템수정자ID" }));

		restApiComponent.post(boApiUrl + "/api/bo/system/menuMgmt/updateMenuDtlInfo", stRtTgtBase, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
	}

	@Override
	public void registSubMenu(List<StRtTgtBase> createList) throws Exception {
		for (StRtTgtBase stRtTgtBase : createList) {
			Validator.throwIfEmpty(stRtTgtBase.getSysGbCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템구분코드" }));
			Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상유형코드" }));
			Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상명" }));
			Validator.throwIfEmpty(stRtTgtBase.getSortSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "정렬순서" }));
			Validator.throwIfEmpty(stRtTgtBase.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "사용여부" }));
			Validator.throwIfEmpty(stRtTgtBase.getUprRtTgtSeq(),
					MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "상위권한대상순번" }));
			Validator.throwIfEmpty(stRtTgtBase.getSysRegId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템등록자ID" }));
			Validator.throwIfEmpty(stRtTgtBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템수정자ID" }));

			restApiComponent.post(boApiUrl + "/api/bo/system/menuMgmt/insertMenuInfo", stRtTgtBase, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
		}
	}

	@Override
	public void modifySubMenu(List<StRtTgtBase> updateList) throws Exception {
		for (StRtTgtBase stRtTgtBase : updateList) {
			Validator.throwIfEmpty(stRtTgtBase.getRtTgtSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상순번" }));
			Validator.throwIfEmpty(stRtTgtBase.getRtTgtTypCd(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상유형코드" }));
			Validator.throwIfEmpty(stRtTgtBase.getRtTgtNm(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상명" }));
			Validator.throwIfEmpty(stRtTgtBase.getSortSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "정렬순서" }));
			Validator.throwIfEmpty(stRtTgtBase.getUseYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "사용여부" }));
			Validator.throwIfEmpty(stRtTgtBase.getPopupYn(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "팝업여부" }));
			Validator.throwIfEmpty(stRtTgtBase.getUprRtTgtSeq(),
					MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "상위권한대상순번" }));
			Validator.throwIfEmpty(stRtTgtBase.getSysModId(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "시스템수정자ID" }));

			restApiComponent.post(boApiUrl + "/api/bo/system/menuMgmt/updateSubMenu", stRtTgtBase, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
		}
	}

	@Override
	public void deleteSubMenu(List<StRtTgtBase> deleteList) throws Exception {
		for (StRtTgtBase stRtTgtBase : deleteList) {
			Validator.throwIfEmpty(stRtTgtBase.getRtTgtSeq(), MessageResolver.getMessage("adminCommon.message.parameter.empty", new String[] { "권한대상순번" }));

			restApiComponent.post(boApiUrl + "/api/bo/system/menuMgmt/deleteSubMenu", stRtTgtBase, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveSubMenu(List<StRtTgtBase> createList, List<StRtTgtBase> updateList, List<StRtTgtBase> deleteList) throws Exception {
		registSubMenu(createList);
		modifySubMenu(updateList);
		deleteSubMenu(deleteList);
	}

	@Override
	public int getSubMenuCheck(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuMgmt/getSubMenuCheck", rtTargetBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}

	@Override
	public int getRtInfoCheck(RtTargetBaseRequest rtTargetBaseRequest) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/menuMgmt/getStRtInfoCheck", rtTargetBaseRequest, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
	}
}
