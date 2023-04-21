package com.enbiz.bo.app.repository.order;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

/**
 * 주문
 */
@Repository
@Lazy
public interface OpOrdBaseMapper {

    /**
     * 주문번호 존재 check
     */
    Boolean existsOrdNo(String ordNo);
}
