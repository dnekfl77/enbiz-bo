package com.enbiz.bo.app.repository.order;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpRfdInfo;

/**
 * 환불처리정보
 */
@Repository
@Lazy
public interface OpRfdInfoTrxMapper {

    /**
     * 환불처리 접수정보
     */
    void insertAccpOpRfdInfo(OpRfdInfo opRfdInfo);
}
