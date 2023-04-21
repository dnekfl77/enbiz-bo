package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.CcSiteBase;

@Repository
@Lazy
public interface CcSiteBaseTrxMapper {

    /**
     * 사이트관리 페이지 - 사이트관리 등록
     * @param createList
     */
    void insertSiteBase(CcSiteBase createList);

    /**
     * 사이트관리 페이지 - 사이트관리 업데이트
     * @param updateList
     */
    void updateSiteBase(CcSiteBase updateList);

}
