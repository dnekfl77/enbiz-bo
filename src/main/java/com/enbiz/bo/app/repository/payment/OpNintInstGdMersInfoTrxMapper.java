package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpNintInstGdBase;
import com.enbiz.bo.app.entity.OpNintInstGdMersInfo;

@Repository
@Lazy
public interface OpNintInstGdMersInfoTrxMapper {

    /**
     * 무이자할부안내가맹점정보 등록
     * @param opNintInstGdMersInfo
     */
    void insertOpNintInstGdMersInfo(OpNintInstGdMersInfo opNintInstGdMersInfo);

    /**
     * 무이자할부안내가맹점정보 삭제
     * @param opNintInstGdBase
     */
    void deleteOpNintInstGdMersInfo(OpNintInstGdBase opNintInstGdBase);

}
