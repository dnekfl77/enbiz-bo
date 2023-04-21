package com.enbiz.bo.app.repository.order;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.EtMbrAstMgrHist;

/**
 * 회원자산관리이력
 */
@Repository
@Lazy
public interface EtMbrAstMgrHistTrxMapper {

    /*회원자산관리익력 insert*/
    void insertCsCpMbrAstMgrHist(EtMbrAstMgrHist etMbrAstMgrHist) throws Exception;
}
