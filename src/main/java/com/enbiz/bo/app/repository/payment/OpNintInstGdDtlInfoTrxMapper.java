package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpNintInstGdBase;
import com.enbiz.bo.app.entity.OpNintInstGdDtlInfo;

@Repository
@Lazy
public interface OpNintInstGdDtlInfoTrxMapper {

    /**
     * 무이자할부안내상세정보 등록
     * @param opNintInstGdDtlInfo
     */
    void insertOpNintInstGdDtlInfo(OpNintInstGdDtlInfo opNintInstGdDtlInfo);

    /**
     * 무이자할부안내상세정보 삭제
     * @param opNintInstGdBase
     */
    void deleteOpNintInstGdDtlInfo(OpNintInstGdBase opNintInstGdBase);

}
