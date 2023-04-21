package com.enbiz.bo.app.repository.vendor;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.EtEntrBase;

@Repository
@Lazy
public interface EtEntrBaseTrxMapper {

    void insertEtEntrBaseTrx(EtEntrBase etEntrBase) throws Exception;

    void updateEtEntrBaseTrx(EtEntrBase etEntrBase) throws Exception;
}
