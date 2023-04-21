package com.enbiz.bo.app.repository.system;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.StStdCd;
import com.enbiz.bo.app.entity.StStdCdMl;

@Repository
@Lazy
public interface StStdCdTrxMapper {

    void insertStStdCd(StStdCd stStdCd);

    void updateStStdCd(StStdCd stStdCd);

    void deleteStStdCd(StStdCdMl stStdCdMl);
    
}
