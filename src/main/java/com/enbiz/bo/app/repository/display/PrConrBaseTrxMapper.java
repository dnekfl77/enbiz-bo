package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrConrBase;

@Repository
@Lazy
public interface PrConrBaseTrxMapper {

    /**
     * 전시 코너 관리 수정
     */
    void updateDisplayCornerBase(PrConrBase prConrBase);

    /**
     * 전시 코너 관리 삭제
     */
    void deleteDisplayCornerBase(PrConrBase prConrBase);

    /**
     * 전시 코너 등록
     */
    void prConrBaseInsert(PrConrBase prConrBase);

    /**
     * 전시 코너 수정
     */
    void prConrBaseUpdate(PrConrBase prConrBase);

}
