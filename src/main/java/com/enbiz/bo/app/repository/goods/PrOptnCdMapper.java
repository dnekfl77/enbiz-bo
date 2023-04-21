package com.enbiz.bo.app.repository.goods;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsOptionRequest;
import com.enbiz.bo.app.dto.request.goods.OptionMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.GoodsOptionResponse;
import com.enbiz.bo.app.dto.response.goods.OptionMgmtResponse;
import com.enbiz.bo.app.entity.PrOptnCd;

import java.util.List;

/**
 * 옵션코드 DAO
 */
@Repository
@Lazy
public interface PrOptnCdMapper {

    /**
     * 옵션관리 > 옵션코드 목록 수 조회
     * @param request
     * @return
     */
    int getPrOptnCdListCount(OptionMgmtRequest request);

    /**
     * 옵션관리 > 옵션코드 목록 조회
     * @param request
     * @return
     */
    List<OptionMgmtResponse> getPrOptnCdList(OptionMgmtRequest request);

    /**
     * 옵션관리 > 옵션코드명 중복여부 확인
     * @param prOptnCd
     * @return
     */
    int getCountOfExistsPrOptnCd(PrOptnCd prOptnCd);

    /**
     * 임시 일반상품 등록 > 옵션코드 목록 조회
     * @param request
     * @return 옵션코드목록
     */
    List<GoodsOptionResponse> getPrOptnCdListFromGoods(GoodsOptionRequest request);

}
