package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.OptionMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.OptionMgmtResponse;
import com.enbiz.bo.app.entity.PrOptnCd;
import com.enbiz.bo.app.entity.PrOptnClssCd;

/**
 * 옵션관리 Service
 */
public interface OptionMgmtService {

    /**
     * 옵션분류코드 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getOptionCategoryListCount(OptionMgmtRequest request) throws Exception;

    /**
     * 옵션분류코드 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<OptionMgmtResponse> getOptionCategoryList(OptionMgmtRequest request) throws Exception;

    /**
     * 옵션코드 목록 수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getOptionListCount(OptionMgmtRequest request) throws Exception;

    /**
     * 옵션코드 목록 조회
     * @param request
     * @return
     * @throws Exception
     */
    List<OptionMgmtResponse> getOptionList(OptionMgmtRequest request) throws Exception;

    /**
     * 옵션분류코드 목록 저장
     * @param createList
     * @param updateList
     * @throws Exception
     */
    void saveOptionCategoryList(List<PrOptnClssCd> createList, List<PrOptnClssCd> updateList) throws Exception;

    /**
     * 옵션코드 목록 저장
     * @param createList
     * @param updateList
     * @throws Exception
     */
    void saveOptionList(List<PrOptnCd> createList, List<PrOptnCd> updateList) throws Exception;
}
