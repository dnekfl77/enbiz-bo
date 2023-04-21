package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.BrandMgmtRequest;
import com.enbiz.bo.app.dto.request.popup.PrBrandMstRequest;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtImageResponse;
import com.enbiz.bo.app.dto.response.goods.BrandMgmtResponse;
import com.enbiz.bo.app.dto.response.popup.PrBrandMstResponse;

/**
 * 브랜드 관리 DAO
 */
@Repository
@Lazy
public interface PrBrandMstMapper {

    /**
     * 브랜드 목록 수 조회
     * @param prBrandMstRequest
     * @return 브랜드 목록 수
     * @throws Exception
     */
    int getBrandListCount(PrBrandMstRequest prBrandMstRequest);

    /**
     * 브랜드 목록 조회(팝업)
     * @param prBrandMstRequest
     * @return 브랜드 목록
     * @throws Exception
     */
    List<PrBrandMstResponse> getBrandList(PrBrandMstRequest prBrandMstRequest);

    /**
     * 브랜드 관리 > 브랜드 목록 조회
     * @param brandMgmtRequest
     * @return 브랜드 목록
     * @throws Exception
     */
    List<BrandMgmtResponse> getBrandMstList(BrandMgmtRequest brandMgmtRequest);

    /**
     * 브랜드 관리 > 브랜드 이미지 조회
     * @param brandMgmtRequest
     * @return
     */
    List<BrandMgmtImageResponse> getBrandImgList(BrandMgmtRequest brandMgmtRequest);

}
