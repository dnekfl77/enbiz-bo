package com.enbiz.bo.app.repository.order;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.MeMbrAstSum;

/**
 * 회원자산집계
 */
@Repository
@Lazy
public interface MeMbrAstSumTrxMapper {

    //회원자산집계 insert
    void insertMeMbrAstSum(MeMbrAstSum meMbrAstSum);

    //회원자산집계 update
    void updateMeMbrAstSum(MeMbrAstSum meMbrAstSum);
}
