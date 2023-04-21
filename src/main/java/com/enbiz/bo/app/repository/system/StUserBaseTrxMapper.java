package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StUserBase;

@Repository
@Lazy
public interface StUserBaseTrxMapper {

    void updateChagePassword(StUserBase stUserBase) throws Exception;
    void updateIdUnlock(StUserBase stUserBase) throws Exception;
    void updateIdLockYnCheck(StUserBase stUserBase) throws Exception;
    /**
     * 로그인 성공 업데이트
     * @param stUserBase
     */
    void updateLoginSuccess(StUserBase stUserBase) throws Exception;

    /**
     * 사용자관리 비밀번호 잠김 해제 업데이트
     * @param stUserBase
     */
    void updatePwdUnlock(StUserBase stUserBase) throws Exception;

    /**
     * 사용자관리 비밀번호 초기화 업데이트
     * @param stUserBase
     */
    void updateInitPassword(StUserBase stUserBase);

    /**
     * 사용자관리 사용자 저장
     * @param stUserBase
     */
    void insertUserBase(StUserBase stUserBase);

    void updateUserBase(StUserBase stUserBase);

    void updatePasswordByPasswordInitialize(StUserBase userParam);
}
