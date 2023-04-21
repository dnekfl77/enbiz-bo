package com.enbiz.bo.app.repository.order;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.MeMbrAstSum;

/**
 * 회원자산집계
 */
@Repository
@Lazy
public interface MeMbrAstSumMapper {
    //회원자삽집계 가져오기
    MeMbrAstSum selectMbrAstSum(MeMbrAstSum meMbrAstSum);
}
