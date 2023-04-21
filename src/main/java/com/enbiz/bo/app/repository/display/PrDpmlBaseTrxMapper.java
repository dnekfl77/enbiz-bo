package com.enbiz.bo.app.repository.display;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.PrDpmlBase;

@Repository
@Lazy
public interface PrDpmlBaseTrxMapper {

    /**
     * 몰 정보 등록 저장 _ 전시몰기본
     * @return
     * @throws Exception
     */
    void prDpmlBaseInsert(PrDpmlBase prDpmlBase) throws Exception;

    /**
     * 몰 정보 수정 저장 _ 전시몰기본
     * @return
     * @throws Exception
     */
    void prDpmlBaseUpdate(PrDpmlBase prDpmlBase) throws Exception;

}
