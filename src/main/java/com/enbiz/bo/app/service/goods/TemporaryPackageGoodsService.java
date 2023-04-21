package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.PackageTargetGoodsRequest;
import com.enbiz.bo.app.dto.request.goods.TemporaryPackageGoodsRequest;
import com.enbiz.bo.app.dto.request.realgrid.RawRealGridCUDRequest;
import com.enbiz.bo.app.dto.response.goods.PackageTargetGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryPackageGoodsResponse;

/**
 * 임시 묶음상품 Service
 */
public interface TemporaryPackageGoodsService {

    /**
     * 임시 묶음상품 정보 조회
     * @param pregGoodsNo
     * @return
     * @throws Exception
     */
    TemporaryPackageGoodsResponse getTemporaryPackageGoodsInfo(String pregGoodsNo) throws Exception;

    /**
     * 묶음대상 상품조회 팝업 > 상품목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getPackageTargetGoodsListCount(PackageTargetGoodsRequest request) throws Exception;

    /**
     * 묶음대상 상품조회 팝업 > 상품목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<PackageTargetGoodsResponse> getPackageTargetGoodsList(PackageTargetGoodsRequest request) throws Exception;

    /**
     * 임시 묶음상품 등록
     * @param rawCUDRequest
     * @param request
     * @throws Exception
     */
    void temporaryPackageGoodsRegist(RawRealGridCUDRequest rawCUDRequest, TemporaryPackageGoodsRequest request) throws Exception;

    /**
     * 임시 묶음상품 수정
     * @param rawCUDRequest
     * @param request
     * @throws Exception
     */
    void temporaryPackageGoodsUpdate(RawRealGridCUDRequest rawCUDRequest, TemporaryPackageGoodsRequest request) throws Exception;
}
