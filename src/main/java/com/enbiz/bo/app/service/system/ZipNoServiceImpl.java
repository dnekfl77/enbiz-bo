package com.enbiz.bo.app.service.system;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtCudRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtRequest;
import com.enbiz.bo.app.dto.response.system.ZipNoMgmtResponse;
import com.enbiz.common.base.rest.Response;
import com.enbiz.common.base.rest.RestApiComponent;

import lombok.RequiredArgsConstructor;

/**
 * 우편번호조회 service
 */
@Service
@Lazy
@RequiredArgsConstructor
public class ZipNoServiceImpl implements ZipNoService {

	private final RestApiComponent restApiComponent;

	@Value("${app.apiUrl.bo}")
	private String boApiUrl;

    /**
     * 우편번호 목록 총 건수 조회
     * @param ZipNoMgmtRequest req
     * @return int count
     * @throws Exception
     */
    @Override
    public int getZipNoListCount(ZipNoMgmtRequest req) throws Exception {
        req = getZipNoMgmtRequest(req);
		return restApiComponent.get(boApiUrl + "/api/bo/system/zipNoMgmt/getZipNoListCount", req, new ParameterizedTypeReference<Response<Integer>>() {}).getPayload();
    }

    /**
     * 우편번호 목록 조회
     * @param ZipNoMgmtRequest req
     * @return List<ZipNoMgmtResponse>
     * @throws Exception
     */
    @Override
    public List<ZipNoMgmtResponse> getZipNoList(ZipNoMgmtRequest req) throws Exception {
        req = getZipNoMgmtRequest(req);
		return restApiComponent.get(boApiUrl + "/api/bo/system/zipNoMgmt/getZipNoList", req, new ParameterizedTypeReference<Response<List<ZipNoMgmtResponse>>>() {}).getPayload();
    }

    /**
     * 우편번호 목록 조회 파라메터 가져오기.
     * @param req
     * @return
     */
    private ZipNoMgmtRequest getZipNoMgmtRequest(ZipNoMgmtRequest req) {
        if(StringUtils.isNotEmpty(req.getParam1())) {
            String[] params = req.getParam1().split("\\s");
            req.setParam1(params[0]);

            if(params.length > 1) {
                req.setParam2(params[1]);
            }
        }

        return req;
    }
    /**
     * 시도명 목록 조회
     * @return List<String>
     * @throws Exception
     */
    @Override
    public List<String> getCityProvinceNameList() throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/zipNoMgmt/getCityProvinceNameList", null, new ParameterizedTypeReference<Response<List<String>>>() {}).getPayload();
    }

    /**
     * 시군구명 목록 조회
     * @param String ctpNm
     * @return List<String>
     * @throws Exception
     */
    @Override
    public List<String> getSiGunGuNameList(String ctpNm) throws Exception {
		return restApiComponent.get(boApiUrl + "/api/bo/system/zipNoMgmt/getSiGunGuNameList", new ZipNoMgmtRequest().setCtpNmParam(ctpNm), new ParameterizedTypeReference<Response<List<String>>>() {}).getPayload();
    }

    /**
     * 우편번호 수정, 삭제
     * @param RealGridCUDRequest<ZipNoMgmtCudRequest> cudReq
     * @throws Exception
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public void saveZipNoList(RealGridCUDRequest<ZipNoMgmtCudRequest> cudReq) throws Exception {
		restApiComponent.get(boApiUrl + "/api/bo/system/zipNoMgmt/saveZipNoList", cudReq, new ParameterizedTypeReference<Response<Void>>() {}).getPayload();
    }

}