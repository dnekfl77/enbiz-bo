package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StZipNo;

@Repository
@Lazy
public interface StZipNoTrxMapper {

    /**
     * 우편번호 수정
     * @param stZipNo
     * @return int
     */
    int updateStZipNo(StZipNo stZipNo);

    /**
     * 우편번호 삭제
     * @param stZipNo
     * @return int
     */
    int deleteStZipNo(StZipNo stZipNo);
}
