package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrConrBaseRequest;
import com.enbiz.bo.app.dto.request.display.PrConrSetInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrDispCtgBaseRequest;
import com.enbiz.bo.app.dto.response.display.PrConrBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrConrSetInfoResponse;
import com.enbiz.bo.app.dto.response.display.PrDispCtgBaseResponse;
import com.enbiz.bo.app.dto.response.display.PrTmplBaseResponse;
import com.enbiz.bo.app.entity.PrConrBase;
import com.enbiz.bo.app.entity.PrConrTgtInfo;

@Repository
@Lazy
public interface PrConrBaseMapper {

    /**
     * 전시 코너 관리 목록
     * @param prConrBaseRequest
     * @return
     */
    List<PrConrBaseResponse> getDisplayCornerList(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시 코너 관리 목록 수
     * @param prConrBaseRequest
     * @return
     */
    int getDisplayCornerListCount(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시 코너 관리 _ 템플릿 목록 조회
     * @param prConrBaseRequest
     * @return
     */
    List<PrTmplBaseResponse> getTmplConrMappInfo(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시 코너 관리 _ 템플릿 목록 수
     * @param prConrBaseRequest
     * @return
     */
    int getTmplConrMappInfoCount(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시 코너 상세조회
     * @param prConrBaseRequest
     * @return
     */
    PrConrBaseResponse getDisplayCornerDetail(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시세트정보에 데이터 여부 확인
     * @param prConrTgtInfo
     * @return
     */
    int checkPrConrSetInfo(PrConrTgtInfo prConrTgtInfo);

    /**
     * 전시코너정보에 코너 데이터 여부 확인
     * @param prConrBase
     * @return
     */
    int checkPrDispConrInfo(PrConrBase prConrBase);

    /**
     * 템플릿코너매핑정보에 해당 코너와 연결된 템플릿 데이터 여부 확인
     * @param prConrBase
     * @return
     */
    int checkPrTmplConrMappInfo(PrConrBase prConrBase);

    /**
     * 전시 연결 관리 팝업 화면 호출
     * @param prConrBaseRequest
     * @return
     */
    PrConrBaseResponse getConnerDetail(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시 연결 관리 팝업 화면 호출 _ 카테고리 경로
     * @param prDispCtgBaseRequest
     * @return
     */
    PrDispCtgBaseResponse getDispHierarchyNm(PrDispCtgBaseRequest prDispCtgBaseRequest);

    /**
     * 전시 대상 세트 목록
     * @param prConrSetInfoRequest
     * @return
     */
    List<PrConrSetInfoResponse> getSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 대상 세트 목록 _ 코너대상정보에서 조회
     * @param prConrSetInfoRequest
     * @return
     */
    List<PrConrSetInfoResponse> getFirstSetConnerList(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 대상 세트 목록 수 조회
     * @param prConrSetInfoRequest
     * @return
     */
    int getSetConnerListCount(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 코너 조회 팝업 조회
     * @param prConrBaseRequest
     * @return
     */
    List<PrConrBaseResponse> getCornerListPopup(PrConrBaseRequest prConrBaseRequest);

    /**
     * 전시 코너 조회 팝업 조회 목록 수
     * @param prConrBaseRequest
     * @return
     */
    int getCornerListPopupCount(PrConrBaseRequest prConrBaseRequest);

}
