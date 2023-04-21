package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrTmplConrMappInfo;

@Repository
@Lazy
public interface PrTmplConrMappInfoTrxMapper {

    /**
     * 템플릿코너매핑정보 신규 등록
     */
    void insertPrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo);

    /**
     * 템플릿코너매핑정보 수정 처리
     */
    void updatePrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo);

    /**
     * 템플릿코너매핑정보 삭제 처리
     */
    void deletePrTmplConrMappInfo(PrTmplConrMappInfo prTmplConrMappInfo);


    /**
     * 전시 템플릿 관리 _코너 신규 등록
     */
    void createDisplayCorner(PrTmplConrMappInfo prTmplConrMappInfo);

    /**
     * 전시 템플릿 관리 _코너 수정 처리
     */
    void updateDisplayCorner(PrTmplConrMappInfo prTmplConrMappInfo);

    /**
     * 전시 템플릿 관리 _코너 삭제
     */
    void deleteDisplayCorner(PrTmplConrMappInfo prTmplConrMappInfo);

}
