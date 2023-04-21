package com.enbiz.bo.app.repository.goods;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.goods.GoodsApprovalMgmtRequest;
import com.enbiz.bo.app.dto.request.goods.GoodsTemporarySaveMgmtRequest;
import com.enbiz.bo.app.dto.response.common.DashboardTrustVendorGoodsApprovalResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsApprovalMgmtResponse;
import com.enbiz.bo.app.dto.response.goods.GoodsTemporarySaveMgmtResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryGeneralGoodsResponse;
import com.enbiz.bo.app.dto.response.goods.TemporaryPackageGoodsResponse;

/**
 * 가등록 상품기본 DAO
 */
@Repository
@Lazy
public interface PrPregGoodsBaseMapper {

    /**
     * 임시 일반상품 상세 > 임시 일반상품 정보 조회
     * @param pregGoodsNo
     * @return
     */
    TemporaryGeneralGoodsResponse getTemporaryGeneralGoodsInfo(String pregGoodsNo);

    /**
     * 임시 묶음상품 상세 > 임시 묶음상품 정보 조회
     * @param pregGoodsNo
     * @return
     */
    TemporaryPackageGoodsResponse getTemporaryPackageGoodsInfo(String pregGoodsNo);

    /**
     * 상품임시저장관리 > 상품임시저장 목록 수 조회
     * @param request
     * @return 품 임시 저장 목록 수
     * @throws Exception
     */
    int getGoodsTemporarySaveListCount(GoodsTemporarySaveMgmtRequest request);

    /**
     * 상품임시저장관리 > 상품임시저장 목록 조회
     * @param request
     * @return 상품 임시 저장 목록
     * @throws Exception
     */
    List<GoodsTemporarySaveMgmtResponse> getGoodsTemporarySaveList(GoodsTemporarySaveMgmtRequest request);

    /**
     * 상품승인관리 > 상품 승인 목록 수 조회
     * @param request
     * @return
     */
    int getGoodsApprovalListCount(GoodsApprovalMgmtRequest request);

    /**
     * 상품승인관리 > 상품 승인 목록 조회
     * @param request
     * @return
     */
    List<GoodsApprovalMgmtResponse> getGoodsApprovalList(GoodsApprovalMgmtRequest request);

    /**
     * 메인 >
     * @return
     */
    List<DashboardTrustVendorGoodsApprovalResponse> getDashboardTrustVendorGoodsApprovalList();

    /**
     * 메인 >
     * @return
     */
    int getDashboardGoodsTodaySoldOutCnt();

    /**
     * 메인 >
     * @return
     */
    int getDashboardGoods2WeekSoldOutCnt();
}
