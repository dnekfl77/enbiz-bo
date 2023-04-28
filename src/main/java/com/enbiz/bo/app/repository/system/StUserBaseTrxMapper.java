package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StUserBase;

@Repository
@Lazy
public interface StUserBaseTrxMapper {

    void updateChagePassword(StUserBase stUserBase) throws Exception;

    // 하단은 호출하는 부분 없음 .. 추후 확인 
    void updateIdUnlock(StUserBase stUserBase) throws Exception;
    void updateIdLockYnCheck(StUserBase stUserBase) throws Exception;
    /**
     * 로그인 성공 업데이트
     * @param stUserBase
     */
    void updateLoginSuccess(StUserBase stUserBase) throws Exception;

    void updatePasswordByPasswordInitialize(StUserBase userParam);
}
