package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrTmplBase;

@Repository
@Lazy
public interface PrTmplBaseTrxMapper {

    /**
     * 전시 템플릿 관리 신규 등록
     */
    void createDisplayTemplate(PrTmplBase prTmplBase);

    /**
     * 전시 템플릿 관리 수정 처리
     */
    void updateDisplayTemplate(PrTmplBase prTmplBase);

    /**
     * 전시 템플릿 관리 삭제 처리
     */
    void deleteDisplayTemplate(PrTmplBase prTmplBase);

}
