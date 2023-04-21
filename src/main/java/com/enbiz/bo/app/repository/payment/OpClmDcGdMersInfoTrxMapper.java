package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpClmDcGdBase;
import com.enbiz.bo.app.entity.OpClmDcGdMersInfo;

@Repository
@Lazy
public interface OpClmDcGdMersInfoTrxMapper {

    /**
     * 청구할인안내가맹점정보 입력
     * @param opClmDcGdMersInfo
     */
    void insertOpClmDcGdMersInfo(OpClmDcGdMersInfo opClmDcGdMersInfo);

    /**
     * 청구할인안내가맹점정보 삭제
     * @param opClmDcGdBase
     */
    void deleteOpClmDcGdMersInfo(OpClmDcGdBase opClmDcGdBase);

}
