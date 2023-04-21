package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpClmDcGdBase;

@Repository
@Lazy
public interface OpClmDcGdBaseTrxMapper {

    /**
     * 청구할인안내기본 입력
     * @param opClmDcGdBase
     */
    void insertOpClmDcGdBase(OpClmDcGdBase opClmDcGdBase);

    /**
     * 청구할인안내기본 수정
     * @param opClmDcGdBase
     */
    void updateOpClmDcGdBase(OpClmDcGdBase opClmDcGdBase);

    /**
     * 청구할인안내기본 삭제
     * @param opClmDcGdBase
     */
    void deleteOpClmDcGdBase(OpClmDcGdBase opClmDcGdBase);

}
