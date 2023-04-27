package com.enbiz.bo.app.service.system;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.dashboard.DashboardNoticeRequest;
import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.ModifySystemNoticeRequest;
import com.enbiz.bo.app.dto.request.system.RegisterSystemNoticeRequest;
import com.enbiz.bo.app.dto.request.system.SystemNoticeCudRequest;
import com.enbiz.bo.app.dto.request.system.SystemNoticeListRequest;
import com.enbiz.bo.app.dto.response.dashboard.DashboardNoticeResponse;
import com.enbiz.bo.app.dto.response.realgrid.RealGridListResponse;
import com.enbiz.bo.app.dto.response.system.SystemNoticeAttachFileResponse;
import com.enbiz.bo.app.dto.response.system.SystemNoticeInfoResponse;
import com.enbiz.bo.app.dto.response.system.SystemNoticeTargetInfoResponse;
import com.enbiz.bo.app.entity.StUserBase;
import com.enbiz.bo.app.service.common.AdminCommonService;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Lazy
@Slf4j
@RequiredArgsConstructor
public class SystemNoticeMgmtServiceImpl implements SystemNoticeMgmtService {
    private final AdminCommonService adminCommonService;

    private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;


    /**
     * 시스템 공지 저장처리
     * @param req
     * @param cudList
     * @throws Exception
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void registSystemNoticeInfo(SystemNoticeCudRequest req, RealGridCUDRequest<StUserBase> cudList) throws Exception {
    	RegisterSystemNoticeRequest registerSystemNoticeRequest = new RegisterSystemNoticeRequest();
    	registerSystemNoticeRequest.setReq(req);
    	registerSystemNoticeRequest.setCudList(cudList);

    	restApiComponent.post(boApiUrl+"/api/bo/system/systemNoticeMgmt/registSystemNoticeInfo", registerSystemNoticeRequest, new ParameterizedTypeReference<Response<String>>() {});

		adminCommonService.confirmFile();
    }

    /**
     * 시스템 공지 수정
     * @param req
     * @param cudList
     * @throws Exception
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void modifySystemNoticeInfo(SystemNoticeCudRequest req, RealGridCUDRequest<StUserBase> cudList) throws Exception {
    	ModifySystemNoticeRequest modifySystemNoticeRequest = new ModifySystemNoticeRequest();
    	modifySystemNoticeRequest.setReq(req);
    	modifySystemNoticeRequest.setCudList(cudList);
    	restApiComponent.put(boApiUrl+ "/api/bo/system/systemNoticeMgmt/modifySystemNoticeInfo", modifySystemNoticeRequest, new ParameterizedTypeReference<Response<String>>() {}).getPayload();
		adminCommonService.confirmFile();
    }

    /**
     * 시스템 공지 정보 조회
     * @param bbcNo
     * @return
     * @throws Exception
     */
    @Override
    public SystemNoticeInfoResponse getSystemNoticeInfo(String bbcNo) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/system/systemNoticeMgmt/getSystemNoticeInfo", bbcNo, new ParameterizedTypeReference<Response<SystemNoticeInfoResponse>>() {}).getPayload();
    }

    /**
     * 시스템 대상 정보 조회
     * @param bbcNo
     * @return
     * @throws Exception
     */
    @Override
    public List<SystemNoticeTargetInfoResponse> getSystemNoticeTargetInfoList(String bbcNo) throws Exception {
    	return restApiComponent.get(boApiUrl+ "/api/bo/system/systemNoticeMgmt/getSystemNoticeTargetInfoList", bbcNo, new ParameterizedTypeReference<Response<List<SystemNoticeTargetInfoResponse>>>() {}).getPayload();
    }

    /**
     * 시스템공지관리 목록 조회
     * @param  SystemNoticeManagementListRequest
     * @return 시스템공지관리 목록
     * @throws Exception
     * @throws
     */
    @Override
    public RealGridListResponse getSystemNoticeList(SystemNoticeListRequest systemNoticeListRequest) throws Exception {
    	return restApiComponent.get(boApiUrl+"/api/bo/system/systemNoticeMgmt/getSystemNoticeList", systemNoticeListRequest, new ParameterizedTypeReference<Response<RealGridListResponse>>() {}).getPayload();
    }

    @Override
    public List<DashboardNoticeResponse> getSystemNoticeInfoListByToday(DashboardNoticeRequest dashboardNoticeRequest) {
    	return restApiComponent.get(boApiUrl+"/api/bo/system/systemNoticeMgmt/getSystemNoticeInfoListByToday", dashboardNoticeRequest, new ParameterizedTypeReference<Response<List<DashboardNoticeResponse>>>() {}).getPayload();
    }

	@Override
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
	public DashboardNoticeResponse getSystemNoticeInfoListByTodayDetail(DashboardNoticeRequest dashboardNoticeRequest) {
    	return restApiComponent.get(boApiUrl+"/api/bo/system/systemNoticeMgmt/getSystemNoticeInfoListByTodayDetail", dashboardNoticeRequest, new ParameterizedTypeReference<Response<DashboardNoticeResponse>>() {}).getPayload();
	}

	@Override
	public List<SystemNoticeAttachFileResponse> getAttachFileList(String bbcNo) {
    	return restApiComponent.get(boApiUrl+"/api/bo/system/systemNoticeMgmt/getAttachFileList", new DashboardNoticeRequest().setBbcNo(bbcNo), new ParameterizedTypeReference<Response<List<SystemNoticeAttachFileResponse>>>() {}).getPayload();
	}

}
