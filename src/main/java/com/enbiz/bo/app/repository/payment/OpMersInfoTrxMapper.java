package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpMersInfo;

@Repository
@Lazy
public interface OpMersInfoTrxMapper {

    /**
     * 가맹점관리 등록
     */
    void opMersInfoInsert(OpMersInfo opMersInfo);

    /**
     * 가맹점관리 수정
     */
    void opMersInfoUpdate(OpMersInfo opMersInfo);

}
