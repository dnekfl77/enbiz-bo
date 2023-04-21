package com.enbiz.bo.app.repository.vendor;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.enbiz.bo.app.entity.EtEntrDlvpInfo;

@Repository
@Lazy
public interface EtEntrDlvpInfoTrxMapper {
    void insertEtEntrDlvpInfoTrx(EtEntrDlvpInfo etEntrDlvpInfo);

    void updateEtEntrDlvpInfoTrx(EtEntrDlvpInfo etEntrDlvpInfo);

    void deleteEtEntrDlvpInfoTrx(EtEntrDlvpInfo etEntrDlvpInfo);
}
