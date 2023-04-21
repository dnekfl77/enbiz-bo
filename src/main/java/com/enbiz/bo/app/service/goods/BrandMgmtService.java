package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.BrandMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtImageResponse;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtResponse;

/**
 * 브랜드관리 Service
 */
public interface BrandMgmtService {

    /**
     * 브랜드 관리 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<BrandMgmtResponse> getBrandList(BrandMgmtRequest request) throws Exception;


    /**
     * 브랜드 이미지 조회
     * @param brandNo
     * @return
     * @throws Exception
     */
    List<BrandMgmtImageResponse> getBrandImageList(String brandNo) throws Exception;

    /**
     * 브랜드 등록 및 업데이트
     * @param request
     * @throws Exception
     */
    void saveBrand(BrandMgmtRequest request) throws Exception;

}
