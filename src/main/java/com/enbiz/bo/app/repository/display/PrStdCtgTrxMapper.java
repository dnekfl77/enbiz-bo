package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrStdCtg;

/**
 * 상품표준분류 트랜잭션 DAO
 */

@Repository
@Lazy
public interface PrStdCtgTrxMapper {

    /**
     * 표준 분류 등록
     * @param prStdCtg
     */
    void insertStandardCategory(PrStdCtg prStdCtg);

    /**
     * 표준 분류 기본 정보 수정
     * @param prStdCtg
     */
    void saveStandardCategoryMgmtInfo(PrStdCtg prStdCtg);

     /**
     * 표준 분류 그리드 정보 수정
     * @param prStdCtg
     */
    void updateStandardCategoryGrid(PrStdCtg prStdCtg);

    /**
     * 표준 분류 삭제
     * @param prStdCtg
     */
    void deleteStandardCategory(PrStdCtg prStdCtg);

}
