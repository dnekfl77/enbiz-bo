package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrMkdpGoodsInfoRequest;
import com.enbiz.bo.app.dto.response.PrMkdpGoodsInfoResponse;
import com.enbiz.bo.app.entity.PrMkdpDivobjInfo;
import com.enbiz.bo.app.entity.PrMkdpGoodsInfo;

@Repository
@Lazy
public interface PrMkdpGoodsInfoMapper {

    /**
     * 기획전 상품 정보 목록 조회
     * @param prMkdpGoodsInfoRequest
     * @return
     */
    List<PrMkdpGoodsInfoResponse> getPrMkdpGoodsInfoList(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest);

    /**
     * 기획전 상품 정보 목록 수 조회
     * @param prMkdpGoodsInfoRequest
     * @return
     */
    int getPrMkdpGoodsInfoListCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest);

    /**
     * 기획전 관리 > 기획전 상품 입력 처리
     * @param prMkdpGoodsInfo
     * @return
     */
    void insertPrMkdpGoodsInfoList(PrMkdpGoodsInfo prMkdpGoodsInfo);

    /**
     * 기획전 관리 > 기획전 상품 수정 처리
     * @param prMkdpGoodsInfo
     * @return
     */
    void updatePrMkdpGoodsInfoList(PrMkdpGoodsInfo prMkdpGoodsInfo);

    /**
     * 기획전 관리 > 기획전 상품 삭제 처리
     * @param prMkdpGoodsInfo
     * @return
     */
    void deletePrMkdpGoodsInfoList(PrMkdpGoodsInfo prMkdpGoodsInfo);

    /**
     * 기획전 관리 > 기획전 상품 삭제 처리 (구분자 삭제에 따른 연쇄 삭제)
     * @param prMkdpDivobjInfo
     * @return
     */
    void deletePrMkdpGoodsInfoListOfDivobj(PrMkdpDivobjInfo prMkdpDivobjInfo);

    /**
     * 기획전 상품 _ 품절 상품 목록 수
     * @param prMkdpGoodsInfoRequest
     * @return
     */
    int getSoldOutCount(PrMkdpGoodsInfoRequest prMkdpGoodsInfoRequest);

}
