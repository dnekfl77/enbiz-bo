package com.enbiz.bo.app.repository.payment;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.OpAplySiteMersInfo;

@Repository
@Lazy
public interface OpAplySiteMersInfoMapper {

    /**
     * 적용사이트가맹점정보 삭제
     */
    void deleteOpAplySiteMersInfo(String mersNo);

    /**
     * 가맹점관리 수정
     */
    void saveOpAplySiteMersInfo(OpAplySiteMersInfo opAplySiteMersInfo);

}
