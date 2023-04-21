package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsOptionRequest;
import com.enbiz.bo.app.dto.request.goods.OptionMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsOptionResponse;
import com.enbiz.bo.app.dto.response.goods.OptionMgmtResponse;
import com.enbiz.bo.app.entity.PrOptnClssCd;

/**
 * 옵션분류코드 DAO
 */
@Repository
@Lazy
public interface PrOptnClssCdMapper {

    /**
     * 옵션관리 > 옵션분류코드 목록 수 조회
     * @param request
     * @return
     */
    int getPrOptnClssCdListCount(OptionMgmtRequest request);

    /**
     * 옵션관리 > 옵션분류코드 목록 조회
     * @param request
     * @return
     */
    List<OptionMgmtResponse> getPrOptnClssCdList(OptionMgmtRequest request);

    /**
     * 옵션관리 > 옵션분류코드명 중복여부 확인
     * @param prOptnClssCd
     * @return
     */
    int getCountOfExistsPrOptnClssCd(PrOptnClssCd prOptnClssCd);

    /**
     * 임시 일반상품 등록 > 옵션분류코드 목록 조회
     * @param request
     * @return 옵션분류코드목록
     */
    List<GoodsOptionResponse> getPrOptnClssCdListFromGoods(GoodsOptionRequest request);

}
