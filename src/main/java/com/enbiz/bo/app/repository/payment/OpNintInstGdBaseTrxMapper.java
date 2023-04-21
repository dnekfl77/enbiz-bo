package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpNintInstGdBase;

@Repository
@Lazy
public interface OpNintInstGdBaseTrxMapper {

    /**
     * 무이자 할부 안내관리 등록
     * @param opNintInstGdBase
     */
    void insertOpNintInstGdBase(OpNintInstGdBase opNintInstGdBase);

    /**
     * 무이자 할부 안내관리 수정
     * @param opNintInstGdBase
     */
    void updateOpNintInstGdBase(OpNintInstGdBase opNintInstGdBase);

    /**
     * 무이자 할부 안내관리 삭제
     * @param opNintInstGdBase
     */
    void deleteOpNintInstGdBase(OpNintInstGdBase opNintInstGdBase);

}
