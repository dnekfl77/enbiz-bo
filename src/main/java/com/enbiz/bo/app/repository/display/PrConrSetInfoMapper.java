package com.enbiz.bo.app.repository.display;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.dto.request.display.PrConrSetInfoRequest;
import com.enbiz.bo.app.dto.request.display.PrConrTgtInfoRequest;
import com.enbiz.bo.app.dto.response.display.PrConrTgtInfoResponse;
import com.enbiz.bo.app.entity.PrConrSetInfo;

@Repository
@Lazy
public interface PrConrSetInfoMapper {

    /**
     * 전시 코너 정보 데이터 중복 확인
     * @param prConrSetInfoRequest
     * @return
     */
    int checkPrDispConrInfo(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 코너 정보 테이블 저장
     * @param prConrSetInfo
     * @return
     */
    void prDispConrInfoInsert(PrConrSetInfo prConrSetInfo);

    /**
     * 해당 코너의 코너대상번호 리스트
     * @param prConrSetInfoRequest
     * @return
     */
    String[] getConrTgtNoList(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 세트 정보 데이터 중복 확인
     * @param prConrSetInfoRequest
     * @return
     */
    int checkPrConrSetInfo(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 대상 정보
     * @param prConrSetInfoRequest
     * @return
     */
    PrConrTgtInfoResponse getPrConrSetInfo(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 코너 정보 테이블 저장 (상세)
     * @param prConrSetInfoRequest
     * @return
     */
    void prConrSetInfoInsert_dpthNo2(PrConrSetInfoRequest prConrSetInfoRequest);

    /**
     * 전시 코너 정보 테이블 저장 (그룹) 입력
     * @param prConrSetInfo
     * @return
     */
    void prConrSetInfoInsert_dpthNo1(PrConrSetInfo prConrSetInfo);

    /**
     * 전시 코너 정보 테이블 저장 (그룹) 수정
     * @param prConrSetInfo
     * @return
     */
    void prConrSetInfoUpdate(PrConrSetInfo prConrSetInfo);

    /**
     * 탭 리스트 조회 _ 세트인 경우
     * @param prConrTgtInfoRequest
     * @return
     */
    List<PrConrTgtInfoResponse> getConrTgtCdList_setY(PrConrTgtInfoRequest prConrTgtInfoRequest);

    /**
     * 탭 리스트 조회 _ 세트가 아닌 경우
     * @param prConrTgtInfoRequest
     * @return
     */
    List<PrConrTgtInfoResponse> getConrTgtCdList_setN(PrConrTgtInfoRequest prConrTgtInfoRequest);

}
