package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrBrandImg;
import com.enbiz.bo.app.entity.PrBrandMst;

/**
 * 브랜드 관리 Trx DAO
 */
@Repository
@Lazy
public interface PrBrandMstTrxMapper {

    /**
     * 브랜드 관리 > 브랜드 등록
     * @param prBrandMst
     * @return
     * @throws Exception
     */
    void insertBrandMst(PrBrandMst prBrandMst);

    /**
     * 브랜드 관리 > 브랜드 수정
     * @param prBrandMst
     */
    void updateBrandMst(PrBrandMst prBrandMst);

    /**
     * 브랜드 관리 > 브랜드이미지 등록
     * @param prBrandImg
     * @return
     * @throws Exception
     */
    void insertBrandImg(PrBrandImg prBrandImg);

    /**
     * 브랜드 관리 > 브랜드이미지 삭제
     * @param prBrandImg
     */
    void deleteBrandImg(PrBrandImg prBrandImg);

}
