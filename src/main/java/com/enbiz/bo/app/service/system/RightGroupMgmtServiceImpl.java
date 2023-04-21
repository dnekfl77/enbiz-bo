package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.system.RightGroupBaseRequest;
import com.enbiz.bo.app.dto.request.system.RightTargetBaseMenuRequest;
import com.enbiz.bo.app.dto.response.system.RightGroupBaseResponse;
import com.enbiz.bo.app.dto.response.system.RightTargetBaseMenuResponse;
import com.enbiz.bo.app.entity.StRtGrpBase;
import com.enbiz.bo.app.entity.StRtInfo;
import com.enbiz.bo.app.repository.system.StRtGrpBaseMapper;
import com.enbiz.bo.app.repository.system.StRtGrpBaseTrxMapper;
import com.enbiz.bo.app.repository.system.StRtInfoTrxMapper;
import com.enbiz.bo.app.repository.system.StRtTgtBaseMapper;
import com.enbiz.common.base.Validator;
import com.enbiz.common.base.exception.MessageResolver;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class RightGroupMgmtServiceImpl implements RightGroupMgmtService {

	private final StRtGrpBaseMapper stRtGrpBaseMapper;
	private final StRtGrpBaseTrxMapper stRtGrpBaseTrxMapper;
	private final StRtTgtBaseMapper stRtTgtBaseMapper;
	private final StRtInfoTrxMapper stRtInfoTrxMapper;

	@Override
	public List<RightGroupBaseResponse> getRightGroupBaseList(RightGroupBaseRequest RightGroupBaseRequest) {
		return stRtGrpBaseMapper.getStRtGrpBaseList(RightGroupBaseRequest);
	}

	@Override
	public int getRightGroupBaseListCount(RightGroupBaseRequest RightGroupBaseRequest) {
		return stRtGrpBaseMapper.getStRtGrpBaseListCount(RightGroupBaseRequest);
	}

	@Override
	public void registRightGroupBase(List<RightGroupBaseRequest> createList) throws Exception {
		for (RightGroupBaseRequest RightGroupBaseRequest : createList) {
			StRtGrpBase stRtGrpBase = new StRtGrpBase();
			BeanUtils.copyProperties(stRtGrpBase, RightGroupBaseRequest);
			Validator.throwIfEmpty(stRtGrpBase.getSysGbCd()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{"시스템구분코드", MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.base.sys.gb.cd")}));
			Validator.throwIfEmpty(stRtGrpBase.getRtGrpNm()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{"권한그룹명", MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.name")}));
			Validator.throwIfEmpty(stRtGrpBase.getAplyStrDt()      , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{"적용시작일자", MessageResolver.getMessage("rightGroupMgmt.label.data.aply.strt.dttm")}));
			Validator.throwIfEmpty(stRtGrpBase.getAplyEndDt()      , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{"적용종료일자", MessageResolver.getMessage("rightGroupMgmt.label.data.aply.end.dttm")}));
			Validator.throwIfEmpty(stRtGrpBase.getUseYn()          , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{"사용여부", MessageResolver.getMessage("adminCommon.use.yn")}));
			Validator.throwIfEmpty(stRtGrpBase.getSysRegId()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{"등록자ID", MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));
			stRtGrpBaseTrxMapper.insertStRtGrpBase(stRtGrpBase);
		}
	}

	@Override
	public void modifyRightGroupBase(List<RightGroupBaseRequest> updateList) throws Exception {
		for (RightGroupBaseRequest RightGroupBaseRequest : updateList) {
			StRtGrpBase stRtGrpBase = new StRtGrpBase();
			BeanUtils.copyProperties(stRtGrpBase, RightGroupBaseRequest);
			Validator.throwIfEmpty(stRtGrpBase.getRtGrpNo()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.no")}));
			Validator.throwIfEmpty(stRtGrpBase.getSysGbCd()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.base.sys.gb.cd")}));
			Validator.throwIfEmpty(stRtGrpBase.getRtGrpNm()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.name")}));
			Validator.throwIfEmpty(stRtGrpBase.getAplyStrDt()      , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.data.aply.strt.dttm")}));
			Validator.throwIfEmpty(stRtGrpBase.getAplyEndDt()      , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.data.aply.end.dttm")}));
			Validator.throwIfEmpty(stRtGrpBase.getUseYn()          , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
			Validator.throwIfEmpty(stRtGrpBase.getSysModId()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));
			stRtGrpBaseTrxMapper.updateStRtGrpBase(stRtGrpBase);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveRightGroupBaseList(List<RightGroupBaseRequest> createList, List<RightGroupBaseRequest> updateList) throws Exception {
		registRightGroupBase(createList);
		modifyRightGroupBase(updateList);
	}

	@Override
	public List<RightTargetBaseMenuResponse> getRightTargetBaseMenuList(RightTargetBaseMenuRequest stRtTgtMenuRequest) {
		Validator.throwIfEmpty(stRtTgtMenuRequest.getRtGrpNo()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.no")}));
		Validator.throwIfEmpty(stRtTgtMenuRequest.getSysGbCd()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.base.sys.gb.cd")}));
		return stRtTgtBaseMapper.getStRtGrpMenuBaseList(stRtTgtMenuRequest);
	}

	@Override
	public int getRightTargetBaseMenuListCount(RightTargetBaseMenuRequest stRtTgtMenuRequest) {
		Validator.throwIfEmpty(stRtTgtMenuRequest.getRtGrpNo()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.no")}));
		Validator.throwIfEmpty(stRtTgtMenuRequest.getSysGbCd()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.base.sys.gb.cd")}));
		return stRtTgtBaseMapper.getStRtGrpMenuBaseListCount(stRtTgtMenuRequest);
	}

	public void updateStRtInfo(List<RightTargetBaseMenuRequest> updateList) throws Exception {
		for (RightTargetBaseMenuRequest RightTargetBaseMenuRequest : updateList) {
			RightTargetBaseMenuRequest.setRtSubGbCd("01");
			StRtInfo stRtInfo = new StRtInfo();
			BeanUtils.copyProperties(stRtInfo, RightTargetBaseMenuRequest);

			Validator.throwIfEmpty(stRtInfo.getRtGrpNo()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.no")}));
			Validator.throwIfEmpty(stRtInfo.getRtTgtSeq()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.seq")}));
			Validator.throwIfEmpty(stRtInfo.getRtSubGbCd()      , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.rtSubGbCd")}));
			Validator.throwIfEmpty(stRtInfo.getUseYn()          , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("adminCommon.use.yn")}));
			Validator.throwIfEmpty(stRtInfo.getSysRegId()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("adminCommon.label.sys.reg.id")}));
			Validator.throwIfEmpty(stRtInfo.getSysModId()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("adminCommon.label.sys.mod.id")}));
			stRtInfoTrxMapper.saveStRtInfo(stRtInfo);
		}
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public void saveRightTargetBaseMenu(List<RightTargetBaseMenuRequest> updateList) throws Exception {
		updateStRtInfo(updateList);
	}

	@Override
	public List<RightTargetBaseMenuResponse> getRightGroupButtonList(RightTargetBaseMenuRequest stRtTgtMenuRequest) {
		Validator.throwIfEmpty(stRtTgtMenuRequest.getSysGbCd()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.base.sys.gb.cd")}));
		Validator.throwIfEmpty(stRtTgtMenuRequest.getRtTgtSeq()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rttgt.seq")}));
		return stRtTgtBaseMapper.getStRtGrpBtnBaseList(stRtTgtMenuRequest);
	}

	@Override
	public int getRightGroupButtonListCount(RightTargetBaseMenuRequest stRtTgtMenuRequest) {
		Validator.throwIfEmpty(stRtTgtMenuRequest.getSysGbCd()        , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rtgrp.base.sys.gb.cd")}));
		Validator.throwIfEmpty(stRtTgtMenuRequest.getRtTgtSeq()       , MessageResolver.getMessage("userMgmt.err.msg.noParameterError", new String[]{MessageResolver.getMessage("rightGroupMgmt.label.rttgt.seq")}));
		return stRtTgtBaseMapper.getStRtGrpBtnBaseListCount(stRtTgtMenuRequest);
	}
}
