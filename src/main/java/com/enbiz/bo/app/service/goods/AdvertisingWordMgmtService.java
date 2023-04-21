package com.enbiz.bo.app.service.goods;

import java.util.List;

import com.enbiz.bo.app.dto.request.goods.AdvertisingWordMgmtRequest;
import com.enbiz.bo.app.dto.response.goods.AdvertisingWordMgmtResponse;
import com.enbiz.bo.app.entity.PrAdveWrdHist;

/**
 * 홍보문구관리 Service
 */
public interface AdvertisingWordMgmtService {

    /**
     * 홍보 문구 목록수 조회
     * @param request
     * @return
     * @throws Exception
     */
    int getAdvertisingWordListCount(AdvertisingWordMgmtRequest request) throws Exception;
    
    /**
     * 홍보 문구 목록 조회
     * @param advertisingWordMgmtRequest
     * @return
     * @throws Exception
     */
    List<AdvertisingWordMgmtResponse> getAdvertisingWordList(AdvertisingWordMgmtRequest advertisingWordMgmtRequest) throws Exception ;

    /**
     * 홍보 문구 등록,수정
     * @param updateList
     * @throws Exception
     */
    void saveAdvertisingWordList(List<PrAdveWrdHist> createList , List<PrAdveWrdHist> updateList) throws Exception;
}
