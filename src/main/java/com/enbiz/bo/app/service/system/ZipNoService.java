package com.enbiz.bo.app.service.system;

import java.util.List;

import com.enbiz.bo.app.dto.request.realgrid.RealGridCUDRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtCudRequest;
import com.enbiz.bo.app.dto.request.system.ZipNoMgmtRequest;
import com.enbiz.bo.app.dto.response.system.ZipNoMgmtResponse;

public interface ZipNoService {

    /**
     * 우편번호목록 전체수 조회
     * @param zipNoMgmtRequest
     * @return 전체수
     * @throws Exception
     */
    int getZipNoListCount(ZipNoMgmtRequest zipNoMgmtRequest) throws Exception;

    /**
     * 우편번호목록 조회
     * @param zipNoMgmtRequest
     * @return 우편번호목록
     * @throws Exception
     */
    List<ZipNoMgmtResponse> getZipNoList(ZipNoMgmtRequest zipNoMgmtRequest) throws Exception;

    /**
     * 시도 목록 조회
     * @return 시도 목록
     * @throws Exception
     */
    List<String> getCityProvinceNameList() throws Exception;

    /**
     * 시군구 목록 조회
     * @param ctpNm
     * @return 시군구 목록
     * @throws Exception
     */
    List<String> getSiGunGuNameList(String ctpNm) throws Exception;

    /**
     * 우편번호 목록 저장
     * @param zipNoMgmtCudRequest
     * @throws Exception
     */
    void saveZipNoList(RealGridCUDRequest<ZipNoMgmtCudRequest> zipNoMgmtCudRequest) throws Exception;

}