package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrGoodsRevAtchFile;

/**
 * 리뷰첨부파일 DAO
 */
@Repository
@Lazy
public interface PrGoodsRevAtchFileMapper {

    /**
     * 리뷰 상세 > 리뷰 첨부파일 목록 조회
     * @param revNo
     * @return
     */
    List<PrGoodsRevAtchFile> getReviewAttachedFileList(String revNo);

}
