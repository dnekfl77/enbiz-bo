package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrDispCtgBase;

@Repository
@Lazy
public interface PrDispCtgBaseTrxMapper {

    /**
     * 몰 정보 등록 저장 _ 전시카테고리기본 & 하위 전시 카테고리 매장 목록 저장
     * @return
     * @throws Exception
     */
    void prDispCtgBaseInsert(PrDispCtgBase prDispCtgBase) throws Exception;

    /**
     * 몰 정보 수정 저장 _ 전시카테고리기본
     * @return
     * @throws Exception
     */
    void prDispCtgBaseUpdate(PrDispCtgBase prDispCtgBase) throws Exception;

    /**
     * 전시 카테고리 관리 _ 전시 몰 정보 수정 저장
     * @return
     * @throws Exception
     */
    void saveMallUpdate(PrDispCtgBase prDispCtgBase) throws Exception;

    /**
     * 전시 카테고리 관리 _ 전시 카테고리 정보 수정 저장
     * @return
     * @throws Exception
     */
    void saveCategoryUpdate(PrDispCtgBase prDispCtgBase) throws Exception;

    /**
     * 전시 카테고리 관리 _ 하위 전시 카테고리 매장 목록 수정
     * @return
     * @throws Exception
     */
    void updatePrDispCtgBase(PrDispCtgBase prDispCtgBase) throws Exception;

    /**
     * 전시 카테고리 관리 _ 하위 전시 카테고리 매장 목록 삭제
     * @return
     * @throws Exception
     */
    void deletePrDispCtgBase(PrDispCtgBase prDispCtgBase) throws Exception;


    /**
     * 전시카테고리기본 & 하위 전시 카테고리 매장 목록 저장 > 대중소세 카테고리 중 최하위에 해당 카테고리번호 입력
     * @return
     * @throws Exception
     */
    void prDispCtgBaseUpdateDispCtgNo(PrDispCtgBase prDispCtgBase) throws Exception;


}
