package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StRtTgtBase;

/**
 * 권한대상 관리
 * munu , 화면 , Request , 버튼
 */
@Repository
@Lazy
public interface StRtTgtBaseTrxMapper {
    /**
     * 메뉴 관리 대메뉴 저장 & 하위 메뉴 등록
     * @param  stRtTgtBase
     * @return void
     * @throws Exception
     */
    void insertMenuInfo(StRtTgtBase stRtTgtBase) throws Exception;

    /**
     * 메뉴 관리 대메뉴 수정
     * @param  stRtTgtBase
     * @return void
     * @throws Exception
     */
    void updateMenuDtlInfo(StRtTgtBase stRtTgtBase) throws Exception;

    /**
     * 하위 메뉴 수정
     */
    void updateSubMenu(StRtTgtBase stRtTgtBase);

    /**
     * 하위 메뉴 삭제
     */
    void deleteSubMenu(StRtTgtBase stRtTgtBase);

}