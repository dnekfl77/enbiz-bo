package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrConrBase;
import com.enbiz.bo.app.entity.PrConrTgtInfo;

@Repository
@Lazy
public interface PrConrTgtInfoTrxMapper {

    /**
     * 전시 코너 관리 삭제
     * PrConrBase 삭제시 연쇄 삭제
     */
    void deleteDisplayCorner(PrConrBase prConrBase);

    /**
     * 코너대상정보 신규 등록 _ 세트인 경우 세트명 행 / 세트 사용안함인 경우 일반행
     */
    void insertPrConrTgtInfo(PrConrTgtInfo prConrTgtInfo);

    /**
     * 코너대상정보 신규 등록 _ 세트명 이외의 행
     */
    void insertPrConrTgtInfoUprConrTgtNo(PrConrTgtInfo prConrTgtInfo);

    /**
     * 코너대상정보 수정 처리
     */
    void updatePrConrTgtInfo(PrConrTgtInfo prConrTgtInfo);

    /**
     * 코너대상정보 삭제 처리
     */
    void deletePrConrTgtInfo(PrConrTgtInfo prConrTgtInfo);

}
