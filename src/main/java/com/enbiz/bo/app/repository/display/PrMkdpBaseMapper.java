package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrMkdpBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrDispImgInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrMkdpDivobjInfoResponse;
import com.enbiz.bo.app.entity.PrDispImgInfo;
import com.enbiz.bo.app.entity.PrMkdpBase;

@Repository
@Lazy
public interface PrMkdpBaseMapper {

    /**
     * 기획전 관리 목록
     * @param prMkdpBaseRequest
     * @return
     */
    List<PrMkdpBaseResponse> getPrMkdpBaseList(PrMkdpBaseRequest prMkdpBaseRequest);

    /**
     * 기획전 관리 목록 수 조회
     * @param prMkdpBaseRequest
     * @return
     */
    int getPrMkdpBaseListCount(PrMkdpBaseRequest prMkdpBaseRequest);

    /**
     * 기획전 관리 > 기획전 등록 팝업 기본정보 탭 입력
     * @param prMkdpBase
     * @return
     */
    void insertPrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 등록 팝업 기본정보 탭 수정
     * @param prMkdpBase
     * @return
     */
    void updatePrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 그리드 저장 수정 처리
     * @param prMkdpBase
     * @return
     */
    void updatePrMkdpBaseList(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 그리드 삭제
     * @param prMkdpBase
     * @return
     */
    void deletePrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 등록 팝업 기본정보 탭  > 이미지 입력
     * @param prDispImgInfo
     * @return
     */
    void insertPrDispImgInfo(PrDispImgInfo prDispImgInfo);

    /**
     * 기획전 관리 > 기획전 등록 팝업 기본정보 탭 > 이미지 삭제
     * @param prDispImgInfo
     * @return
     */
    void deletePrDispImgInfo(PrDispImgInfo prDispImgInfo);

    /**
     * 기획전 관리 > 기획전 그리드 행삭제 _ 기획전 구분자 정보 연쇄삭제
     * @param prMkdpBase
     * @return
     */
    void deletePrMkdpDivobjInfoForPrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 그리드 행삭제 _ 기획전 상품 정보 연쇄삭제
     * @param prMkdpBase
     * @return
     */
    void deletePrMkdpGoodsInfoForPrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 그리드 행삭제 _ 전시그룹매핑 정보 연쇄삭제
     * @param prMkdpBase
     * @return
     */
    void deletePrDispGrpMappInfoForPrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 그리드 행삭제 _ 전시 이미지 정보 연쇄삭제
     * @param prMkdpBase
     * @return
     */
    void deletePrDispImgInfoForPrMkdpBase(PrMkdpBase prMkdpBase);

    /**
     * 기획전 관리 > 기획전 상세 조회
     * @param prMkdpBaseRequest
     * @return
     */
    PrMkdpBaseResponse getPrMkdpBaseDetail(PrMkdpBaseRequest prMkdpBaseRequest);

    /**
     * 기획전 관리 > 기획전 이미지 상세 조회
     * @param prMkdpBaseRequest
     * @return
     */
    List<PrDispImgInfoResponse> getPrDispImgInfoDetail(PrMkdpBaseRequest prMkdpBaseRequest);

    /**
     * 구분자 정보 목록 조회
     * @param prMkdpBaseRequest
     * @return
     */
    List<PrMkdpDivobjInfoResponse> getPrMkdpDivObjInfoList(PrMkdpBaseRequest prMkdpBaseRequest);

    /**
     * 구분자 정보 목록 수 조회
     * @param prMkdpBaseRequest
     * @return
     */
    int getPrMkdpDivObjInfoListCount(PrMkdpBaseRequest prMkdpBaseRequest);

    /**
     * 템플릿 리스트
     * @return
     */
    List<PrMkdpDivobjInfoResponse> getPrTmplBase();

}
